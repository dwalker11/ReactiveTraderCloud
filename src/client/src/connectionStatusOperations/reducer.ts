import { handleActions } from 'redux-actions'
import { ACTION_TYPES } from './actions'
import { ConnectionStatus } from '../types/index'

interface State {
  connection: ConnectionStatus
  connectionType: string
  url: string
}

const initialState: State = {
  connection: ConnectionStatus.disconnected,
  connectionType: '',
  url: ''
}

export type Connections = State

export default handleActions(
  {
    [ACTION_TYPES.CONNECTION_STATUS_UPDATE]: (state: State, action): State => action.payload
  },
  initialState
)
