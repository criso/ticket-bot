import React from 'react';
import { shape, arrayOf, string } from 'prop-types';
import MultipleChoice from '../MultipleChoice';

const defaultProps = {
  options: [
    { value: 'new_ticket', label: 'create new ticket' },
    { value: 'find_ticket', label: 'existing ticket' }
  ]
};

const propTypes = {
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired
    })
  )
};

const TicketChoices = ({ onSelect, options }) => (
  <MultipleChoice onSelect={onSelect} options={options} />
);

TicketChoices.defaultProps = defaultProps;
TicketChoices.propTypes = propTypes;
export default TicketChoices;
