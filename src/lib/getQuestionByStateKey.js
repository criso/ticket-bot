import { intro, newTicket, findTicket, pingTicket } from './constants/States';

const getQuestionByStateKey = (key) => {
  const byKey = {
    [intro]: 'How may I help you today?',
    [newTicket]: 'What would you like to order?',
    [findTicket]: 'Please enter a ticket number',
    [pingTicket]: 'What you like to send a ping to this ticket?'
  };

  return (
    byKey[key] && {
      question: byKey[key],
      key: key
    }
  );
};

export default getQuestionByStateKey;
