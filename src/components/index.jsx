import React, { Component } from 'react'; /*eslint-disable-line */
import { StateMachine } from 'xstate'; /*eslint-disable-line */
import TicketContainer from './TicketContainer';
import configureMachine from '../stateMachine/configureMachine';

const logState = (state) => {
  /*eslint-disable no-console */
  if (console && console.groupCollapsed && console.log && console.groupEnd) {
    console.group(`[MachineTransition]: `);
    console.log(state.value, { ...state });
    console.groupEnd();
  }
  /*eslint-enable no-console */
};

const getLogger = () => {
  console.warn(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'development' ? logState : () => {};
};

/**
 * @param {Component} WrappedComponent
 * @param {StateMachine=} machine
 */
const withMachine = (WrappedComponent, logState = getLogger()) => {
  const machine = configureMachine();

  const Wrapped = ({ onViewProviders, ...props }) => {
    return (
      <WrappedComponent {...props} machine={machine} logState={logState} />
    );
  };

  Wrapped.displayName = 'TicketContainerWithMachine';
  return Wrapped;
};

export default withMachine(TicketContainer);
