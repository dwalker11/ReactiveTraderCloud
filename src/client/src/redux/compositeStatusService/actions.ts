import { createAction } from 'redux-actions'

export enum ACTION_TYPES {
  COMPOSITE_STATUS_SERVICE = '@ReactiveTraderCloud/COMPOSITE_STATUS_SERVICE'
}

export const createCompositeStatusServiceAction = createAction(ACTION_TYPES.COMPOSITE_STATUS_SERVICE)
