import React from 'react';
import { node, string } from 'prop-types';
import { Container, TextContainer, Text, ChatLine } from './styles';
import { getMaxWidth, getBorderColorFromType } from './ChatMsg.utils';

const defaultProps = {
  type: 'NONE'
};

const propTypes = {
  children: node.isRequired,
  type: string
};

const ChatMsg = ({ children, type = defaultProps.type, ...props }) => (
  <ChatLine data-testid="ChatLine" {...props}>
    <Container {...getMaxWidth(type)}>
      <TextContainer>
        <Text {...getBorderColorFromType(type)}>{children}</Text>
      </TextContainer>
    </Container>
  </ChatLine>
);

ChatMsg.defaultProps = defaultProps;
ChatMsg.propTypes = propTypes;
export default ChatMsg;
