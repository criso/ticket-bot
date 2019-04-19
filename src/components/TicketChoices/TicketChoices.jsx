import React, { Fragment } from 'react';
import { shape, arrayOf, string, node } from 'prop-types';
import IconNew from '@material-ui/icons/FiberNew';
import IconFind from '@material-ui/icons/FindInPage';
import MultipleChoice from '../MultipleChoice';

const defaultProps = {
  options: [
    {
      value: 'new_ticket',
      label: (
        <Fragment>
          <IconNew /> Create New Ticket
        </Fragment>
      )
    },
    {
      value: 'find_ticket',
      label: (
        <Fragment>
          <IconFind />
          Find Existing Ticket
        </Fragment>
      )
    }
  ]
};

const propTypes = {
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: node
    })
  )
};

const TicketChoices = ({ onSelect, options }) => (
  <MultipleChoice onSelect={onSelect} options={options} />
);

TicketChoices.defaultProps = defaultProps;
TicketChoices.propTypes = propTypes;
export default TicketChoices;
