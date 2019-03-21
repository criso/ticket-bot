import {
  error,
  pending,
  noResults,
  itemOrdered,
  findTicket,
  newTicket,
  done,
  pingTicket
} from '../../lib/constants/States';

const stateContainsKey = (currentState, key) =>
  !!currentState.toStrings().find((str) => str.indexOf([key]) !== -1);

export const shouldShowErrorMsg = (currentState) =>
  stateContainsKey(currentState, error);

export const shouldShowLoading = (currentState) =>
  stateContainsKey(currentState, pending);

export const shouldShowNoResultsMsg = (currentState) =>
  stateContainsKey(currentState, noResults);

export const shouldShowSuccessMsg = (currentState) =>
  currentState.matches(itemOrdered) ||
  currentState.matches(`${findTicket}.${done}`);

export const getSuccessMsg = (currentState) => {
  const states = [
    [itemOrdered, () => 'Boom! Your order has been made!'],
    [`${pingTicket}.${done}`, () => 'Boom! We found your ticket!']
  ];
  const [, render] =
    states.find(([state]) => currentState.matches(state)) || [];
  return render ? render() : null;
};

export const getNoResultsMsg = (currentState) => {
  const states = [
    [
      `${newTicket}.${noResults}`,
      () =>
        "We couldn't find any available items for your request. Would you like to select something else?"
    ],
    [
      `${findTicket}.${noResults}`,
      () => "We couldn't find a ticket that matches your request"
    ]
  ];

  const [, render] =
    states.find(([state]) => currentState.matches(state)) || [];

  return render ? render() : null;
};
