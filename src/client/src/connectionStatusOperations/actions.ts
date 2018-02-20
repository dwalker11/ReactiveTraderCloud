import { createAction } from 'redux-actions'

export enum ACTION_TYPES {
  CONNECTION_STATUS_UPDATE = '@ReactiveTraderCloud/CONNECTION_STATUS_UPDATE',
  RECONNECT = '@ReactiveTraderCloud/RECONNECT'
}

export const createConnectionStatusUpdateAction = createAction(ACTION_TYPES.CONNECTION_STATUS_UPDATE)
