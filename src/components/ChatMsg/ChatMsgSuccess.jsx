import React from 'react';
import { node } from 'prop-types';
import ChatMsg from './ChatMsg';

const propTypes = {
  children: node.isRequired
};

const ChatMsgSuccess = ({ children }) => (
  <ChatMsg data-testid="ChatMsgSuccess" type="success">
    <span role="img" aria-label="horns sunglasses emoji">
      🤘😎🤘
    </span>
    {children}
  </ChatMsg>
);

ChatMsgSuccess.propTypes = propTypes;
export default ChatMsgSuccess;
