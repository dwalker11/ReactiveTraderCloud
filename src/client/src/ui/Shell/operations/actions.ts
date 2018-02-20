import { ACTION_TYPES } from '../../../connectionStatusOperations/index'

export function reconnect() {
  return { type: ACTION_TYPES.RECONNECT }
}
