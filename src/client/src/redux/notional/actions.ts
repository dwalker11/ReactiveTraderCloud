import { createAction } from 'redux-actions'

export enum ACTION_TYPES {
  NOTIONAL_INPUT = '@ReactiveTraderCloud/NOTIONAL_INPUT'
}

export const onNotionalInputChange = createAction(ACTION_TYPES.NOTIONAL_INPUT)
