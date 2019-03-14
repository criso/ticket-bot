import React from 'react';
import { instanceOf } from 'prop-types';
import { State } from 'xstate';
import { Section, ChatContainer, ChatBodyContainer, ChatBody } from './styles';
import ChatMsgQuestion from '../ChatMsg/ChatMsgQuestion';
import ChatMsgAnswer from '../ChatMsg/ChatMsgAnswer';
import ChatFooter from '../ChatFooter';
import {
  error,
  pending,
  noResults,
  itemOrdered
} from '../../lib/constants/States';
import ChatMsgError from '../ChatMsg/ChatMsgError';
import ChatMsgLoading from '../ChatMsgLoading';
import ChatMsgWarning from '../ChatMsg/ChatMsgWarning';
import ChatMsgSuccess from '../ChatMsg/ChatMsgSuccess';

const propTypes = {
  currentState: instanceOf(State).isRequired
};

const stateContainsKey = (currentState, key) =>
  !!currentState.toStrings().find((str) => str.indexOf([key]) !== -1);

const shouldShowErrorMsg = (currentState) =>
  stateContainsKey(currentState, error);

const shouldShowLoading = (currentState) =>
  stateContainsKey(currentState, pending);

const shouldShowNoResultsMsg = (currentState) =>
  stateContainsKey(currentState, noResults);

const shouldShowOrderedItemMsg = (currentState) =>
  currentState.matches(itemOrdered);

const Ticket = ({ currentState, onSelect }) => (
  <Section>
    <ChatContainer>
      <ChatBodyContainer>
        <ChatBody data-testid="ChatBody">
          {currentState.context.chat.map(({ question, answer }) => (
            <React.Fragment key={`${question}.${answer}`}>
              <ChatMsgQuestion>{question}</ChatMsgQuestion>
              {answer && <ChatMsgAnswer>{answer}</ChatMsgAnswer>}
            </React.Fragment>
          ))}

          {shouldShowLoading(currentState) && <ChatMsgLoading />}

          {shouldShowErrorMsg(currentState) && <ChatMsgError />}

          {shouldShowNoResultsMsg(currentState) && (
            <ChatMsgWarning>
              We couldn't find any available items for your request. Would you
              like to select something else?
            </ChatMsgWarning>
          )}

          {shouldShowOrderedItemMsg(currentState) && (
            <ChatMsgSuccess>Boom! Your order has been made!</ChatMsgSuccess>
          )}
        </ChatBody>
      </ChatBodyContainer>
      <ChatFooter onSelect={onSelect} currentState={currentState} />
    </ChatContainer>
  </Section>
);

Ticket.propTypes = propTypes;
export default Ticket;
