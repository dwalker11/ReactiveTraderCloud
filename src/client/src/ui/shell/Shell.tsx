import * as React from 'react'
import { Modal } from '../modal'
import FooterContainer from '../footer/FooterContainer'
import SidebarRegionContainer from '../sidebar/SidebarRegionContainer'
import { WorkspaceContainer } from '../workspace/'
import { BlotterContainer } from '../blotter'
import './ShellStyles.scss'
import '../common/styles/_base.scss'
import '../common/styles/_fonts.scss'
import RegionWrapper from '../common/regions/RegionWrapper'
import * as classnames from 'classnames'
import TradeNotificationContainer from '../notification/TradeNotificationContainer'
import * as PropTypes from 'prop-types'
import styled from 'react-emotion'
const SplitPane = require('react-split-pane')


// TODO: Find a better location, ie. theme file
const variables = {
  'splash-logo-height': '400px',
  'splash-logo-margin-top': '20vh'
}

const splashImg = {
  'src': '../common/images/logo-transparent.png'
}

// TODO: Fix missing image
const ShellSplash = styled('div')`
  background: url('${props => splashImg.src}'), #1f2a36;
  background-size: 400px ${props => variables['splash-logo-height']};
  background-position: 50% ${props => variables['splash-logo-margin-top']};
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  position: fixed;
  z-index: 100;
  animation: hideSplashScreen 1s ease-out 2s forwards;
`

const ShellSplashMessage = styled('span')`
  text-align: center;
  color: white;
  position: absolute;
  bottom: calc(100vh - ${props => variables['splash-logo-margin-top']} - ${props => variables['splash-logo-height']} - 50px);
  left: 0;
  right: 0;
  width: 100px;
  margin: auto;
  font-size: 18px;
`

export interface ShellProps {
  sessionExpired: boolean
  showSplitter: boolean
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
    const { sessionExpired, showSplitter } = this.props
    return (
      <div className={classnames({ shell__browser_wrapper: !this.context.openFin })}>
        <ShellSplash>
          <ShellSplashMessage>{this.appVersion}<br/>Loading...</ShellSplashMessage>
        </ShellSplash>
        <div className="shell__container">
          <Modal shouldShow={sessionExpired} title="Session expired">
            <div>
              <div>Your 15 minute session expired, you are now disconnected from the server.</div>
              <div>Click reconnect to start a new session.</div>
              <button className="btn shell__button--reconnect"
                      onClick={this.props.reconnect}>Reconnect
              </button>
            </div>
          </Modal>

          {/*we do not show the split view if the blotter is popped out*/}
          { showSplitter ? this.renderSplitView() : this.renderTiles()}

          <RegionWrapper region="analytics">
            <SidebarRegionContainer/>
          </RegionWrapper>
        </div>
        <div className="shell__footer">
          <FooterContainer/>
          <TradeNotificationContainer/>
        </div>
      </div>
    )
  }

  private renderTiles = ():JSX.Element => {
    return (<div className="shell_workspace_blotter">
      <WorkspaceContainer/>
    </div>)
  }

  private renderSplitView = ():JSX.Element => {
    return (<SplitPane minSize={300} size={ 600 } split="horizontal" style={{position: 'relative'}}>
      <WorkspaceContainer/>
      <div className="shell__blotter-container"><RegionWrapper region="blotter">
        <div className="shell__blotter">
          <BlotterContainer/>
        </div>
      </RegionWrapper>
      </div>
    </SplitPane>)
  }
}
