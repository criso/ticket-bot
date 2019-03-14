import React from 'react';
import { instanceOf } from 'prop-types';
import { State } from 'xstate';
import { Section } from './styles';
import Choices from './Choices';

const propTypes = {
  currentState: instanceOf(State).isRequired
};

const ChatFooter = ({ currentState, onSelect }) => (
  <Section>
    <Choices onSelect={onSelect} currentState={currentState} />
  </Section>
);

ChatFooter.propTypes = propTypes;
export default ChatFooter;
