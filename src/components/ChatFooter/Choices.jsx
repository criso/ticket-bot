/*eslint-disable react/display-name */
import { instanceOf, arrayOf, array } from 'prop-types';
import { State } from 'xstate';
import stateRenderers from './stateRenderers';

const defaultProps = {
  stateRenderers: stateRenderers
};

const propTypes = {
  currentState: instanceOf(State).isRequired,
  stateRenderers: arrayOf(array)
};

const Choices = ({ currentState, stateRenderers, ...props }) => {
  const [, renderState] =
    stateRenderers.find(([key]) => currentState.matches(key)) || [];

  return renderState ? renderState({ ...props, currentState }) : null;
};

Choices.propTypes = propTypes;
Choices.defaultProps = defaultProps;
export default Choices;
