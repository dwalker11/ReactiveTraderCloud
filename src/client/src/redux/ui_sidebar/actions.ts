import { createAction } from 'redux-actions'

export enum ACTION_TYPES {
  TOGGLE_ANALYTICS = '@ReactiveTraderCloud/TOGGLE_ANALYTICS'
}

export const toggleAnalytics = createAction(ACTION_TYPES.TOGGLE_ANALYTICS)
