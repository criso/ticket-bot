import React from 'react';
import { func, arrayOf, shape, string, node } from 'prop-types';
import { Section, Options, Option } from './styles';
import Button from '../Button';

const propTypes = {
  onSelect: func.isRequired,
  options: arrayOf(
    shape({
      value: string,
      label: node
    })
  ).isRequired
};

const MultipleChoice = ({ onSelect, options, ...props }) => (
  <Section {...props}>
    <Options>
      {options.map(({ value, label, disabled }, index) => (
        <Option key={`${value}_${label}`}>
          <Button
            disabled={disabled}
            onClick={() => onSelect({ value, label })}
          >
            {label}
          </Button>
        </Option>
      ))}
    </Options>
  </Section>
);

MultipleChoice.propTypes = propTypes;
export default MultipleChoice;
