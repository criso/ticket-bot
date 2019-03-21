import React from 'react';
import {
  error,
  intro,
  newTicket,
  noResults,
  findTicket,
  done,
  pingTicket,
  question
} from '../../lib/constants/States';
import TicketChoices from '../TicketChoices';
import PeripheralChoices from '../PeripheralChoices.jsx';
import FindTicketForm from '../FindTicketForm';
import OrderStillProcessing from '../OrderStillProcessing';

/**
 * These are matched in order, so specific states should be first
 */
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

  [`${findTicket}.${error}`, () => null],

  [`${findTicket}.${noResults}`, () => null],

  [findTicket, ({ onSelect }) => <FindTicketForm onSelect={onSelect} />],

  [
    `${pingTicket}.${question}`,
    ({ onSelect, currentState }) => (
      <OrderStillProcessing
        onSelect={onSelect}
        canPing={true}
        item={currentState.context.results.item}
      />
    )
  ],

  [
    `${pingTicket}.${done}`,
    ({ currentState }) => (
      <OrderStillProcessing
        pingSent={true}
        item={currentState.context.results.item}
      />
    )
  ]
];

export default stateRenderers;
