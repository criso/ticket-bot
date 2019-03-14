export const shouldCreateNewTicket = (ctx, event) =>
  event.data.value === 'new_ticket';

export const shouldFindTicket = (ctx, event) =>
  event.data.value === 'find_ticket';

export const hasNoResults = (ctx, event) => event.data.count === 0;
