import React from 'react';
import ChatMsg from '../ChatMsg/ChatMsg';
import { Dots } from './styles';

const ChatMsgLoading = () => (
  <ChatMsg data-testid="ChatMsgloading">
    <Dots>
      <li />
      <li />
      <li />
    </Dots>
  </ChatMsg>
);

export default ChatMsgLoading;
