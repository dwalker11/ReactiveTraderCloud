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
  'shell-background-color': '#1d2027',
  'footer-height': '40px',
  'splash-logo-height': '400px',
  'splash-logo-margin-top': '20vh'
}

const splashImg = {
  'src': '../common/images/logo-transparent.png'
}

// TODO: Fix missing image
// TODO: Import 'keyframes' to handle splash animation
// TODO: Import 'facepaint' to handle media breakpoints
const ShellSplash = styled('div')`
  background: url('${splashImg.src}'), #1f2a36;
  background-size: 400px ${variables['splash-logo-height']};
  background-position: 50% ${variables['splash-logo-margin-top']};
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
  bottom: calc(100vh - ${variables['splash-logo-margin-top']} - ${variables['splash-logo-height']} - 50px);
  left: 0;
  right: 0;
  width: 100px;
  margin: auto;
  font-size: 18px;
`

const ShellContainer = styled('div')`
  background-color: ${variables['shell-background-color']};
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  height: calc(100% - ${variables['footer-height']});
  width: 100%;

  & * {
    box-sizing: border-box;
  }
`

const ShellFooter = styled('div')`
  height: ${variables['footer-height']};
`

// TODO: Import 'cx' library to
const ShellReconnectBtn = styled('button')`
  min-width: 100px;
  height: 28px;
  margin: 20px 10px;
`

const ShellWorkspaceBlotter = styled('div')`
  height: 100%;
  width: 100%;
  min-height: 20px;
  & * {
    box-sizing: border-box;
  }
`

const ShellBlotterContainer = styled('div')`
  width: 100%;
  height: auto;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const ShellBlotter = styled('div')`
  width: 100%;
  height: 100%;
  overflow: auto;
  order: 2;
  box-sizing: border-box;
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

  // TODO: Import the cx library to "class={'btn shell__button--reconnect'}" below
  render() {
    const { sessionExpired, showSplitter } = this.props
    return (
      <div className={classnames({ shell__browser_wrapper: !this.context.openFin })}>
        <ShellSplash>
          <ShellSplashMessage>{this.appVersion}<br/>Loading...</ShellSplashMessage>
        </ShellSplash>
        <ShellContainer>
          <Modal shouldShow={sessionExpired} title="Session expired">
            <div>
              <div>Your 15 minute session expired, you are now disconnected from the server.</div>
              <div>Click reconnect to start a new session.</div>
              <ShellReconnectBtn onClick={this.props.reconnect}>Reconnect</ShellReconnectBtn>
            </div>
          </Modal>

          {/*we do not show the split view if the blotter is popped out*/}
          { showSplitter ? this.renderSplitView() : this.renderTiles()}

          <RegionWrapper region="analytics">
            <SidebarRegionContainer/>
          </RegionWrapper>
        </ShellContainer>
        <ShellFooter>
          <FooterContainer/>
          <TradeNotificationContainer/>
        </ShellFooter>
      </div>
    )
  }

  private renderTiles = ():JSX.Element => {
    return (
      <ShellWorkspaceBlotter>
        <WorkspaceContainer/>
      </ShellWorkspaceBlotter>
    )
  }

  private renderSplitView = ():JSX.Element => {
    return (
      <SplitPane minSize={300} size={ 600 } split="horizontal" style={{position: 'relative'}}>
        <WorkspaceContainer/>
        <ShellBlotterContainer>
          <RegionWrapper region="blotter">
            <ShellBlotter>
              <BlotterContainer/>
            </ShellBlotter>
          </RegionWrapper>
        </ShellBlotterContainer>
      </SplitPane>
    )
  }
}
