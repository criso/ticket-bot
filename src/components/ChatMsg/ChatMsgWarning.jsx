import React from 'react';
import { node } from 'prop-types';
import ChatMsg from './ChatMsg';

const propTypes = {
  children: node.isRequired
};

const ChatMsgWarning = ({ children }) => (
  <ChatMsg data-testid="ChatMsgError" type="warning">
    <span role="img" aria-label="point right">
      👉
    </span>
    {children}
  </ChatMsg>
);

ChatMsgWarning.propTypes = propTypes;
export default ChatMsgWarning;
