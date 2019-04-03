import React, { Fragment } from 'react';
import { shape, arrayOf, string, func, bool, object } from 'prop-types';
import IconLaptop from '@material-ui/icons/Laptop';
import IconMouse from '@material-ui/icons/Mouse';
import IconMonitor from '@material-ui/icons/Tv';
import MultipleChoice from '../MultipleChoice';

const defaultProps = {
  options: [
    {
      value: 'monitor',
      label: (
        <Fragment>
          <IconMonitor /> Monitor
        </Fragment>
      )
    },
    {
      value: 'laptop',
      label: (
        <Fragment>
          <IconLaptop /> Laptop
        </Fragment>
      )
    },
    {
      value: 'mouse',
      label: (
        <Fragment>
          <IconMouse /> Mouse
        </Fragment>
      )
    }
  ]
};

const propTypes = {
  onSelect: func.isRequired,
  query: object.isRequired,
  hasNoResults: bool.isRequired,
  options: arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired
    })
  )
};

const sanitizeOptions = (options, query) =>
  options.map((option) =>
    option.value === query.peripheral
      ? {
          ...option,
          disabled: true
        }
      : option
  );

const PeripheralChoices = ({ onSelect, options, query, hasNoResults }) => (
  <MultipleChoice
    onSelect={onSelect}
    options={hasNoResults ? sanitizeOptions(options, query) : options}
  />
);

PeripheralChoices.defaultProps = defaultProps;
PeripheralChoices.propTypes = propTypes;
export default PeripheralChoices;
