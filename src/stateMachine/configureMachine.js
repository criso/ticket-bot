import { StateMachine } from 'xstate'; /*eslint-disable-line*/
import flowMachine from './flowMachine';
import getInitialContext from './getInitialContext';
import * as actions from './actions';
import * as guards from './guards';
import * as services from './services';

/**
 *
 * @param {Object} context
 * @returns {StateMachine}
 */
const configureMachine = (context = getInitialContext()) =>
  flowMachine
    .withConfig({
      actions,
      guards,
      services
    })
    .withContext(context);

export default configureMachine;
