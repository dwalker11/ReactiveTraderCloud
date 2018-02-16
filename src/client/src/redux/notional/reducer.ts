import { ACTION_TYPES } from './actions'
import { Action, handleActions } from 'redux-actions'

// TODO: Does this belong in the types folder???
export interface NotionalUpdate {
  currencyPairSymbol: string
  value: number
}

const INITIAL_STATE = {}

export default handleActions(
  {
    [ACTION_TYPES.NOTIONAL_INPUT]: (state: any, action: Action<NotionalUpdate>) => {
      return {
        ...state,
        [action.payload.currencyPairSymbol]: action.payload.value
      }
    }
  },
  INITIAL_STATE
)
