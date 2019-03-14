import React from 'react';
import { node } from 'prop-types';
import ChatMsg from './ChatMsg';

const propTypes = {
  children: node.isRequired
};

const ChatMsgQuestion = ({ children }) => (
  <ChatMsg data-testid="ChatMsgQuestion">
    <span role="img" aria-label="robot emoji">
      🤖
    </span>
    {children}
  </ChatMsg>
);

ChatMsgQuestion.propTypes = propTypes;
export default ChatMsgQuestion;
