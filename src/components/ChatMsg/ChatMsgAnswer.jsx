import React from 'react';
import { node } from 'prop-types';
import {
  AnswerTextContainer as TextContainer,
  AnswerContainer as Container,
  AnswerText as Text,
  ChatLine
} from './styles';

const propTypes = {
  children: node.isRequired
};

const ChatMsgAnswer = ({ children }) => (
  <ChatLine data-testid="ChatMsgAnswer">
    <Container>
      <TextContainer>
        <Text>{children}</Text>
      </TextContainer>
    </Container>
  </ChatLine>
);

ChatMsgAnswer.propTypes = propTypes;
export default ChatMsgAnswer;
