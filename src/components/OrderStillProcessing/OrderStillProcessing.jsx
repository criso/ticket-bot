import React from 'react';
import { Section } from './styles';
import SentPing from './SentPing';
import SendPingForm from './SendPingForm';

const OrderStillProcessing = ({
  item,
  onSelect,
  pingSent = false,
  canPing = false
}) => (
  <Section>
    <div>
      Your <strong>{item}</strong> order is still being processed.
    </div>

    {pingSent && <SentPing />}
    {canPing && <SendPingForm onSelect={onSelect} />}
  </Section>
);

export default OrderStillProcessing;
