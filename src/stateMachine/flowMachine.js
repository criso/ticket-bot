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
  findTicket,
  pingTicket,
  shouldSkip,
  skipped
} from '../lib/constants/States';
import { ANSWER } from '../lib/constants/Actions';

const flowMachine = Machine({
  initial: intro,
  states: {
    [intro]: {
      initial: question,
      on: {
        [ANSWER]: [
          {
            target: newTicket,
            cond: 'shouldCreateNewTicket',
            actions: 'updateCtxWithAnswer'
          },
          {
            target: findTicket,
            cond: 'shouldFindTicket',
            actions: 'updateCtxWithAnswer'
          }
        ]
      },
      states: {
        [question]: { onEntry: 'askIntroQuestion' }
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
              {
                target: done,
                actions: 'updateCtxWithResults',
                cond: 'hasItems'
              },
              { target: noResults }
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
            src: 'getTicket',
            onDone: [
              {
                target: done,
                actions: 'updateCtxWithResults',
                cond: 'foundTicket'
              },
              { target: noResults }
            ],
            onError: error
          }
        },
        [done]: { type: 'final' }
      },
      onDone: pingTicket
    },

    [pingTicket]: {
      initial: shouldSkip,
      on: {
        [ANSWER]: [
          {
            target: `.${done}`,
            actions: 'updateCtxWithAnswer',
            cond: 'shouldSendPing'
          },
          {
            target: `.${skipped}`,
            actions: 'skipPing'
          }
        ]
      },
      states: {
        [shouldSkip]: {
          on: {
            '': [
              { target: question, cond: 'shouldAskPingTicket' },
              { target: done }
            ]
          }
        },
        [question]: {
          onEntry: 'askPingTicket'
        },
        [done]: {},
        [skipped]: {}
      }
    },

    [itemOrdered]: {}
  }
});

export default flowMachine;
