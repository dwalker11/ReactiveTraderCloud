import { ACTION_TYPES } from '../connectionStatus'

export function reconnect() {
  return { type: ACTION_TYPES.RECONNECT }
}
