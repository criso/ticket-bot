import { Machine } from 'xstate';
import {
  intro,
  question,
  newTicket,
  pending,
  done,
  error,
  noResults,
  itemOrdered,
  findTicket
} from '../lib/constants/States';
import { ANSWER } from '../lib/constants/Actions';

const flowMachine = Machine({
  initial: intro,
  states: {
    [intro]: {
      initial: question,
      on: {
        [ANSWER]: [
          { target: newTicket, cond: 'shouldCreateNewTicket', actions: 'updateCtxWithAnswer' },
          { target: findTicket, cond: 'shouldFindTicket', actions: 'updateCtxWithAnswer' }
        ]
      },
      states: {
        [question]: { onEntry: 'askIntroQuestion' }
      }
    },

    [findTicket]: {
      initial: question,
      on: {
        [ANSWER]: { target: `.${pending}`, actions: 'updateCtxWithAnswer' }
      },
      states: {
        [question]: { onEntry: 'askFindTicket' },
        [error]: {},
        [noResults]: {},
        [pending]: {
          invoke: {
            src: 'getPeripheral',
            onDone: [
              { target: noResults, cond: 'hasNoResults' },
              { target: done, actions: 'updateCtxWithResults' }
            ],
            onError: error
          }
        },
        [done]: {
          type: 'final'
        }
      }
    },

    [newTicket]: {
      initial: question,
      on: {
        [ANSWER]: { target: `.${pending}`, actions: 'updateCtxWithAnswer' }
      },
      states: {
        [question]: { onEntry: 'askNewTicket' },
        [error]: {},
        [noResults]: {},
        [pending]: {
          invoke: {
            src: 'getPeripheral',
            onDone: [
              { target: noResults, cond: 'hasNoResults' },
              { target: done, actions: 'updateCtxWithResults' }
            ],
            onError: error
          }
        },
        [done]: {
          type: 'final'
        }
      },
      onDone: itemOrdered
    },

    [itemOrdered]: {}
  }
});

export default flowMachine;
