import React from 'react';
import { node } from 'prop-types';
import ChatMsg from './ChatMsg';

const propTypes = {
  children: node.isRequired
};

const defaultProps = {
  children: 'Ooops! There was an error processing your request'
};

const ChatMsgError = ({ children }) => (
  <ChatMsg data-testid="ChatMsgError" type="error">
    <span role="img" aria-label="screaming cat emoji">
      🙀
    </span>
    {children}
  </ChatMsg>
);

ChatMsgError.defaultProps = defaultProps;
ChatMsgError.propTypes = propTypes;
export default ChatMsgError;
