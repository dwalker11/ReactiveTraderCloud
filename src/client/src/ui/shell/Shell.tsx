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
import TradeNotificationContainer from '../notification/TradeNotificationContainer'
import * as PropTypes from 'prop-types'
import styled, { css, cx, keyframes } from 'react-emotion'
const SplitPane = require('react-split-pane')


// TODO: Find a better location, ie. A theme file, withProps
const variables = {
  'shell-background-color': '#1d2027',
  'footer-height': '40px',
  'splash-logo-height': '400px',
  'splash-logo-margin-top': '20vh'
}

const hideSplashScreen = keyframes`
  0% {
    opacity: 1;
    width: 100vw;
    height: 100vh;
  }
  99% {
    opacity: 0;
    width: 100vw;
    height: 100vh;
  }
  100% {
    opacity: 0;
    width: 0;
    height: 0;
  }
`

// TODO: Fix invalid reference to missing image
const ShellSplash = styled('div')`
  background: url('../common/images/logo-transparent.png'), #1f2a36;
  background-size: 400px ${variables['splash-logo-height']};
  background-position: 50% ${variables['splash-logo-margin-top']};
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  position: fixed;
  z-index: 100;
  animation: ${hideSplashScreen} 1s ease-out 2s forwards;
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

  @media all and (max-width: 700px) {
		height: 100%;
    flex-direction: column;
	}
`

const ShellFooter = styled('div')`
  height: ${variables['footer-height']};
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

  @media all and (max-width: 700px) {
    flex: 1;
		min-height: 400px;
    width: 100%;
    order: 3;
	}
`

const shellBrowserWrapper = css`
  width: 100vw;
  height: 100vh;

  @media all and (max-width: 700px) {
    height: auto;
  }
`

const reconnectBtn = css`
  min-width: 100px;
  height: 28px;
  margin: 20px 10px;
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
      <div className={cx({[shellBrowserWrapper] : !this.context.openFin })}>
        <ShellSplash>
          <ShellSplashMessage>{this.appVersion}<br/>Loading...</ShellSplashMessage>
        </ShellSplash>
        <ShellContainer>
          <Modal shouldShow={sessionExpired} title="Session expired">
            <div>
              <div>Your 15 minute session expired, you are now disconnected from the server.</div>
              <div>Click reconnect to start a new session.</div>
              <button className={cx('btn', reconnectBtn)} onClick={this.props.reconnect}>Reconnect</button>
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
