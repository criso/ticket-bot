import { assign } from 'xstate';
import getQuestionByStateKey from '../lib/getQuestionByStateKey';
import {
  intro,
  newTicket,
  findTicket,
  pingTicket
} from '../lib/constants/States';

const updateQuery = (ctx, { data }) => {
  const { value, key } = data;
  const byKey = {
    [newTicket]: () => ({ peripheral: value }),
    [findTicket]: () => ({ ticket: value })
  };

  return byKey[key] ? byKey[key]() : {};
};

const updateChat = (ctx, { data }) =>
  ctx.chat.map((chatItem) =>
    chatItem.key === data.key
      ? {
          ...chatItem,
          answer: data.label
        }
      : chatItem
  );

export const updateCtxWithAnswer = assign({
  query: updateQuery,
  chat: updateChat
});

export const updateCtxWithResults = assign({
  results: (ctx, { data }) => data
});

const askQuestion = (key) =>
  assign({
    chat: (ctx) => [].concat(ctx.chat, getQuestionByStateKey(key))
  });

export const askIntroQuestion = askQuestion(intro);
export const askNewTicket = askQuestion(newTicket);
export const askFindTicket = askQuestion(findTicket);
export const askPingTicket = askQuestion(pingTicket);

export const skipPing = assign({
  chat: (ctx) =>
    updateChat(ctx, {
      data: {
        key: pingTicket,
        label: 'No'
      }
    })
});
