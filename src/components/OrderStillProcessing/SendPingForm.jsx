import React from 'react';
import { PingSection } from './styles';
import Button from '../Button';

const SendPingForm = ({ onSelect }) => (
  <PingSection>
    <span>Would you like to ping this order?</span>
    <Button
      onClick={() => onSelect({ label: 'Ping Order', value: 'ping_order' })}
    >
      Ping
    </Button>
    <Button
      mode="secondary"
      onClick={() => onSelect({ label: 'No', value: 'cancel' })}
    >
      Cancel
    </Button>
  </PingSection>
);
export default SendPingForm;
