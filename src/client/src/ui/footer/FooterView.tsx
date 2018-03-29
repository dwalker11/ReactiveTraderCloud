import * as React from 'react'
import * as _ from 'lodash'
import styled, { css, cx } from 'react-emotion'
import { StatusIndicator } from './StatusIndicator'

import './FooterStyles.scss'
import { ConnectionStatus, ServiceStatus } from '../../types/'
import { Connections } from '../../connectionStatusOperations'
import { ApplicationStatusConst, ConnectionType } from '../../types'

const variables = {
  'error-color': '#00a8cc',
  'success-color': '#7ed321',
  'warning-color': '#f8ab02',
  'footer-background-color': '#00a8cc'
}

const FooterDisconnected = css``

const Footer = css`
  height: 100%;
  width: 100vw;
  background-color: ${variables['footer-background-color']};
  color: white;
  position: relative;

  &.${FooterDisconnected} {
    background-color: ${variables['error-color']};
  }
`

const FooterConnectionUrl = styled('span')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  margin: auto;
  height: 20px;
  font-size: 16px;
  font-family: BrandonLight;
`

const FooterLogoContainer = styled('span')`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 50px;
  display: flex;
  width: 250px;
  height: 100%;
  margin-top: 2px;
`

const FooterLogo = css`
  cursor: pointer;
  flex: 1;
`

const FooterLogoOpenfin = css`
  background: url('../common/images/openfin-logo.svg') no-repeat;
  height: 70%;
  margin-top: 5px;
`

const FooterLogoAdaptive = css`
  background: url('../common/images/adaptive-logo-dark.svg') no-repeat;
`

const FooterStatusIndicatorWrapper = styled('div')`
  position: absolute;
  right: 16px;
  height: 24px;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
`

const FooterServiceStatusPanel = css`
  position: absolute;
  bottom: 100%;
  right: 0;
  width: 200px;
  background-color: ${variables['footer-background-color']};
  z-index: 100;
`

const FooterServices = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 10px;
`

const FooterService = styled('li')``

const FooterServiceLabel = styled('span')`
  font-size: 14px;
`

const FooterIconOnline = css`
  margin-right: 5px;
  color: ${variables['success-color']};
`

const FooterIconOffline = css`
  margin-right: 5px;
  color: ${variables['error-color']};
`

export interface Services {
  pricing: ServiceStatus
  reference: ServiceStatus
  blotter: ServiceStatus
  execution: ServiceStatus
  analytics: ServiceStatus
}

interface FooterViewProps {
  compositeStatusService: Services
  connectionStatus: Connections
  toggleStatusServices: () => void
  displayStatusServices: boolean
  isRunningInOpenFin: boolean
  openFin: any
}

const ADAPTIVE_URL: string = 'http://www.weareadaptive.com'
const OPENFIN_URL: string = 'http://openfin.co'

export const FooterView: React.SFC<FooterViewProps> = (props: FooterViewProps) => {

  const servicesAsList = _.values(props.compositeStatusService)

  const footerClasses = cx(Footer, {[FooterDisconnected]: !isConnected(props.connectionStatus.connection)})
  const openfinLogoClassName = cx(FooterLogo, {[FooterLogoOpenfin]: props.isRunningInOpenFin})
  const adaptiveLogoClassName = cx(FooterLogo, FooterLogoAdaptive)
  const panelClasses = cx(FooterServiceStatusPanel, {'hide': !isConnected(props.connectionStatus.connection) || !props.displayStatusServices})

  const openLink = (url: string) => {
    props.isRunningInOpenFin ?  props.openFin.openLink(url) : window.open(url, '_blank')
  }

  return (
    <footer className={footerClasses}>
      <FooterConnectionUrl>
        {isConnected(props.connectionStatus.connection)
          ? `Connected to ${props.connectionStatus.url} (${props.connectionStatus.connectionType})`
          : 'Disconnected'}
      </FooterConnectionUrl>
      <FooterLogoContainer>
        <span className={openfinLogoClassName} onClick={() => openLink(OPENFIN_URL)}/>
        <span className={adaptiveLogoClassName} onClick={() => openLink(ADAPTIVE_URL)}/>
      </FooterLogoContainer>
      <FooterStatusIndicatorWrapper onMouseOut={() => props.toggleStatusServices()} onMouseOver={() => props.toggleStatusServices()}>
        <StatusIndicator status={getApplicationStatus(props.connectionStatus.connection, servicesAsList, props.connectionStatus.connectionType)}/>
      </FooterStatusIndicatorWrapper>
      <div className={panelClasses}>
        <FooterServices>
          <FooterService key={Math.random()}>{renderBroker(props.connectionStatus.connection)}</FooterService>
          {servicesAsList.map(renderServiceStatus)}
        </FooterServices>
      </div>
    </footer>
  )
}

const getApplicationStatus = (connection: ConnectionStatus, services, connectionType) => {
  if (connection === ConnectionStatus.connected && _.every(services, 'isConnected') && connectionType === ConnectionType.WebSocket) {
    return ApplicationStatusConst.Healthy
  } else if (_.some(services, 'isConnected')) {
    return ApplicationStatusConst.Warning
  } else {
    return ApplicationStatusConst.Down
  }
}

const isConnected = (connection: ConnectionStatus) => connection === ConnectionStatus.connected

const renderServiceStatus = (serviceStatus: ServiceStatus) => (
  <FooterService key={Math.random()}>{renderStatus(serviceStatus)}</FooterService>
)

const renderBroker = (connection: ConnectionStatus) => (
  isConnected(connection) &&
  <FooterServiceLabel><i className={cx('fa fa-circle', FooterIconOnline)}/>broker</FooterServiceLabel> ||
  <FooterServiceLabel><i className={cx('fa fa-circle-o', FooterIconOffline)}/>broker</FooterServiceLabel>
)

const renderStatus = serviceStatus => (
  serviceStatus.isConnected &&
  <FooterServiceLabel><i className={cx('fa fa-circle', FooterIconOnline)}/>{renderTitle(serviceStatus)}</FooterServiceLabel> ||
  <FooterServiceLabel><i className={cx('fa fa-circle-o', FooterIconOffline)}/>{serviceStatus.serviceType}</FooterServiceLabel>
)

const renderConnectedNodesText = (connectedInstanceCount: number) => (
  connectedInstanceCount === 1 && 'node' || 'nodes'
)

const renderTitle = ({ serviceType, connectedInstanceCount }) => (
  `${serviceType} (${connectedInstanceCount} ${renderConnectedNodesText(connectedInstanceCount)})`
)

export default FooterView
