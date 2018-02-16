import { combineEpics } from 'redux-observable'
import { ACTION_TYPES, createConnectionStatusUpdateAction } from './actions'
import { Connections } from './reducer'
import { ConnectionStatus } from '../../types'

const connectionStatusToState = compositeStatusService$ => (connectionStatus: ConnectionStatus): Connections => {
  return {
    connection: connectionStatus || ConnectionStatus.init,
    connectionType: compositeStatusService$.connectionType || '',
    url: compositeStatusService$.connectionUrl || ''
  }
}

export function connectionStatusEpicsCreator(compositeStatusService$) {
  const connectToServices = () => compositeStatusService$.connection.connect()

  const updateConnectionStateEpic = () => {
    return compositeStatusService$.connectionStatusStream.map(connectionStatusToState(compositeStatusService$)).map(createConnectionStatusUpdateAction)
  }

  const reconnectEpic = action$ => {
    return (
      action$
        .ofType(ACTION_TYPES.RECONNECT)
        .do(connectToServices)
        // Hack to never emit any actions, because we don't need any action.
        .takeLast()
    )
  }

  return combineEpics(updateConnectionStateEpic, reconnectEpic)
}
