import './ShellStyles.scss'
import '../common/styles/_base.scss'
import '../common/styles/_fonts.scss'
import * as classnames from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import Modal from './Modal'
import BlotterContainer from '../Blotter'
import RegionWrapper from '../common/regions'
import FooterContainer from '../Footer'
import SidebarRegionContainer from '../SidebarRegion'
import TradeNotificationContainer from '../TradeNotification'
import WorkspaceContainer from '../Workspace'

export interface ShellProps {
  sessionExpired: boolean
  onReconnectClick: () => void
  reconnect: () => void
}

export default class Shell extends React.Component<ShellProps, {}> {
  static contextTypes = {
    openFin: PropTypes.object
  }
  props: ShellProps
  appVersion: string = __VERSION__ // version from package.json exported in webpack.config.js

  render() {
    const { sessionExpired } = this.props
    return (
      <div className={classnames({ shell__browser_wrapper: !this.context.openFin })}>
        <div className="shell__splash">
          <span className="shell__splash-message">
            {this.appVersion}
            <br />Loading...
          </span>
        </div>
        <div className="shell__container">
          <Modal shouldShow={sessionExpired} title="Session expired">
            <div>
              <div>Your 15 minute session expired, you are now disconnected from the server.</div>
              <div>Click reconnect to start a new session.</div>
              <button className="btn shell__button--reconnect" onClick={this.props.reconnect}>
                Reconnect
              </button>
            </div>
          </Modal>
          <div className="shell_workspace_blotter">
            <WorkspaceContainer />
            <RegionWrapper region="blotter">
              <div className="shell__blotter">
                <BlotterContainer />
              </div>
            </RegionWrapper>
          </div>
          <RegionWrapper region="analytics">
            <SidebarRegionContainer />
          </RegionWrapper>
        </div>
        <div className="shell__footer">
          <FooterContainer />
          <TradeNotificationContainer />
        </div>
      </div>
    )
  }
}