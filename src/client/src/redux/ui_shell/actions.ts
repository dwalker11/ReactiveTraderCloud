import { ACTION_TYPES } from '../root/connectionStatusOperations'

export function reconnect() {
  return { type: ACTION_TYPES.RECONNECT }
}
