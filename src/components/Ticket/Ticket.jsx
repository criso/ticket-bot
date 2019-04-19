import React from 'react';
import { instanceOf } from 'prop-types';
import { State } from 'xstate';
import { Section, ChatContainer, ChatBodyContainer, ChatBody } from './styles';
import ChatMsgQuestion from '../ChatMsg/ChatMsgQuestion';
import ChatMsgAnswer from '../ChatMsg/ChatMsgAnswer';
import ChatFooter from '../ChatFooter';
import ChatMsgError from '../ChatMsg/ChatMsgError';
import ChatMsgLoading from '../ChatMsgLoading';
import ChatMsgWarning from '../ChatMsg/ChatMsgWarning';
import ChatMsgSuccess from '../ChatMsg/ChatMsgSuccess';
import {
  shouldShowLoading,
  shouldShowErrorMsg,
  shouldShowNoResultsMsg,
  getNoResultsMsg,
  shouldShowSuccessMsg,
  getSuccessMsg
} from './Ticket.utils';

const propTypes = {
  currentState: instanceOf(State).isRequired
};

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
            <ChatMsgWarning>{getNoResultsMsg(currentState)}</ChatMsgWarning>
          )}

          {shouldShowSuccessMsg(currentState) && (
            <ChatMsgSuccess>{getSuccessMsg(currentState)}</ChatMsgSuccess>
          )}
        </ChatBody>
      </ChatBodyContainer>
      <ChatFooter onSelect={onSelect} currentState={currentState} />
    </ChatContainer>
  </Section>
);

Ticket.propTypes = propTypes;
export default Ticket;
