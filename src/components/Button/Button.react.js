import React from 'react';
import { node, func, oneOf } from 'prop-types';
import { PrimaryButton, SecondaryButton, DisabledButton } from './styles';

const propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
  mode: oneOf(['primary', 'secondary'])
};

const defaultProps = {
  mode: 'primary'
};

const Button = ({ children, onClick, disabled, mode = defaultProps.mode }) => {
  const btnProps = { onClick, children };

  if (disabled) {
    return <DisabledButton>{children}</DisabledButton>;
  }

  return mode === 'primary' ? (
    <PrimaryButton {...btnProps} />
  ) : (
    <SecondaryButton {...btnProps} />
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
