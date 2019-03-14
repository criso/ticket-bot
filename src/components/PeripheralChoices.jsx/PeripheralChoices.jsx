import React from 'react';
import { shape, arrayOf, string, func, bool, object } from 'prop-types';
import MultipleChoice from '../MultipleChoice';

const defaultProps = {
  options: [
    { value: 'monitor', label: 'Monitor' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'mouse', label: 'Mouse' }
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
