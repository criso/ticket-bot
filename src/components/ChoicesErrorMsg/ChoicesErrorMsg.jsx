import React from 'react';
import { node, func } from 'prop-types';
import { Container, Text, Message } from './styles';

const propTypes = {
  children: node.isRequired,
  onTryAgain: func.isRequired
};

const ChoicesErrorMsg = ({ children, onTryAgain }) => (
  <Container>
    <Message>
      <span role="img" aria-label="screaming cat emoji">
        🙀
      </span>
      <Text>{children}</Text>
    </Message>
  </Container>
);

ChoicesErrorMsg.propTypes = propTypes;
export default ChoicesErrorMsg;
