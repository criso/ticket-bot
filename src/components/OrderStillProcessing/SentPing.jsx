import React from 'react';
import { PingSection } from './styles';

const SentPing = () => (
  <PingSection>
    <div>
      <span role="img" aria-label="red light emoji">
        🚨
      </span>{' '}
      A Ping has been sent!
    </div>
  </PingSection>
);

export default SentPing;
