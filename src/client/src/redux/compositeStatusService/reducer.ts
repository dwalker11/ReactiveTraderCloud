import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from './actions'

export default handleActions(
  {
    [ACTION_TYPES.COMPOSITE_STATUS_SERVICE]: (state, action) => action.payload
  },
  {}
)
