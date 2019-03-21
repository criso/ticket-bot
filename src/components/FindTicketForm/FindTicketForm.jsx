import React, { Component } from 'react';
import Button from '../Button';
import { Section } from './styles';

class FindTicketForm extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { value } = this.input.current;
    if (value) {
      this.props.onSelect({
        label: value,
        value
      });
    }
  };

  render() {
    return (
      <Section>
        <form>
          <label>Ticket Number:</label>
          <input autoFocus={true} ref={this.input} type="text" />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </form>
      </Section>
    );
  }
}

export default FindTicketForm;
