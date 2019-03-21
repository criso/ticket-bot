export const shouldCreateNewTicket = (ctx, event) =>
  event.data.value === 'new_ticket';

export const shouldFindTicket = (ctx, event) =>
  event.data.value === 'find_ticket';

export const shouldSendPing = (ctx, event) => event.data.value === 'ping_order';

export const shouldAskPingTicket = (ctx) => !ctx.results.pinged;

export const hasItems = (ctx, event) => event.data.count > 0;

export const foundTicket = (ctx, event) => event.data.item;
