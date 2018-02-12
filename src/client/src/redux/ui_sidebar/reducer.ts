import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from './actions'

const INITIAL_STATE = true

export default handleActions(
  {
    [ACTION_TYPES.TOGGLE_ANALYTICS]: state => !state
  },
  INITIAL_STATE
)
