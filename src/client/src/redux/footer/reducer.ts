import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from './actions'

const INITIAL_STATE = false

export default handleActions(
  {
    [ACTION_TYPES.TOGGLE_STATUS_SERVICES]: state => !state
  },
  INITIAL_STATE
)
