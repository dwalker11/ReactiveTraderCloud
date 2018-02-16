import { connect } from 'react-redux'
import Shell from './shell'
import { reconnect } from '../../redux/shell'
import { ConnectionStatus } from '../../types'

function mapStateToProps({ connectionStatus }) {
  const sessionExpired = connectionStatus.connection === ConnectionStatus.sessionExpired
  return { sessionExpired }
}

const ConnectedShellContainer = connect(mapStateToProps, { reconnect })(Shell)

export default ConnectedShellContainer
