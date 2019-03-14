import React from 'react';
import { error, intro, newTicket, noResults, findTicket } from '../../lib/constants/States';
import TicketChoices from '../TicketChoices';
import PeripheralChoices from '../PeripheralChoices.jsx';
import FindTicketForm from '../FindTicketForm';

const stateRenderers = [
  [intro, ({ onSelect }) => <TicketChoices onSelect={onSelect} />],

  [`${newTicket}.${error}`, () => null],

  [
    newTicket,
    ({ onSelect, currentState }) => (
      <PeripheralChoices
        query={currentState.context.query}
        hasNoResults={currentState.matches(`${newTicket}.${noResults}`)}
        onSelect={onSelect}
      />
    )
  ],

  [
    findTicket,
    ({ onSelect }) => <FindTicketForm onSelect={onSelect} />
  ]
];

export default stateRenderers;
