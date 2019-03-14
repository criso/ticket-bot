import { intro, newTicket, findTicket } from './constants/States';

const getQuestionByStateKey = (key) => {
  const byKey = {
    [intro]: 'How may I help you today?',
    [newTicket]: 'What would you like to order?',
    [findTicket]: 'Please enter a ticket number'
  };

  return (
    byKey[key] && {
      question: byKey[key],
      key: key
    }
  );
};

export default getQuestionByStateKey;
