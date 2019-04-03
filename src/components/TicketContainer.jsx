import React, { Component } from 'react';
import { StateNode, interpret } from 'xstate';
import { func, instanceOf } from 'prop-types';
import Ticket from './Ticket';
import { ANSWER } from '../lib/constants/Actions';

class TicketContainer extends Component {
  static defaultProps = {
    logState: () => {}
  };

  static propTypes = {
    machine: instanceOf(StateNode).isRequired,
    logState: func
  };

  constructor(props) {
    super(props);

    this.state = { currentState: props.machine.initialState };
    this.service = interpret(props.machine).onTransition(
      this.handleMachineTransition
    );
  }

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  // returns the parent key for the current state e.g:
  // state `foo.bar.baz`, `foo` will be returned
  getCurrentStateKey() {
    return Object.keys(this.state.currentState.value)[0];
  }

  handleMachineTransition = (currentState) => {
    this.props.logState(currentState);
    this.setState({ currentState });
  };

  handleSelect = ({ label, value, key }) => {
    this.service.send({
      type: ANSWER,
      data: {
        key: this.getCurrentStateKey(),
        value,
        label
      }
    });
  };

  render() {
    const { currentState } = this.state;

    return <Ticket onSelect={this.handleSelect} currentState={currentState} />;
  }
}

export default TicketContainer;
