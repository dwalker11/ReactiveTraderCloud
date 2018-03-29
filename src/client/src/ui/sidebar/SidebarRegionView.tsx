import * as React from 'react'
import styled, { css, cx } from 'react-emotion'

import { AnalyticsContainer } from '../analytics'
import './SidebarRegionViewStyles.scss'

const variables = {
  'panel-background-color': '#293543',
  'analytics-height': '100%',
  'active-color': '#262a33',
  'border-color': '#424545',
  'button-height': '50px'
}

const ShellSidebar = styled('div')`
  flex-grow: 0;
  flex-shrink: 0;
  height: ${variables['analytics-height']};
  overflow-y: auto;
  background: ${variables['panel-background-color']};
  padding: 0px;
  display: flex;
  flex-direction: row;

  @media all and (max-width: 700px) {
    height: auto;
    width: 100%;
    flex: 1;
    order: 2;
  }
`

const SidebarRegionContainer = styled('div')`
  background-color: ${variables['container-bg-color']};
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const SidebarRegionElement = styled('div')`
  border-left: 1px solid ${variables['border-color']};
  width: 100%;
  flex: 1;
`

const sidebarRegionElementActive = css`
  background-color: ${variables['active-color']};
  border: 1px solid ${variables['border-color']};
  border-left-color: ${variables['active-color']};

  &:hover{
    background-color: ${variables['container-bg-color']};
    border-right-color: ${variables['border-color']};
  }
`

const sidebarRegionElementInactive = css`
  border: 1px solid ${variables['container-bg-color']};
  border-left-color: ${variables['border-color']};
  background-color: ${variables['container-bg-color']};

  &:hover{
    background-color: ${variables['active-color']};
    border-bottom-color: ${variables['border-color']};
    border-top-color: ${variables['border-color']};
  }
`

const sidebarRegionElementButton = css`
  height: ${variables['button-height']};
  color: white;
  text-align: center;
  padding: 20px 10px;
  cursor: pointer;
`

const sidebarRegionContent = css`
  width: 440px;
`

const sidebarRegionContainerNoContent = css`
  display: none;
`

interface SidebarRegionViewProps {
  displayAnalytics: boolean
  toggleAnalytics: () => void
}

export const SidebarRegionView: React.SFC<SidebarRegionViewProps> = (props: SidebarRegionViewProps) => {
  // TODO: Refactor this (using rendered props)
  const analyticsStyles = cx(
    sidebarRegionContent,
    {[sidebarRegionContainerNoContent]: !props.displayAnalytics}
  )

  // TODO: Refactor this (using rendered props)
  const buttonStyles = cx(
    'glyphicon glyphicon-stats',
    sidebarRegionElementButton,
    {[sidebarRegionElementActive]: props.displayAnalytics},
    {[sidebarRegionElementInactive]: !props.displayAnalytics}
  )

  return (
    <ShellSidebar>
      <div className={analyticsStyles}>
        <AnalyticsContainer/>
      </div>
      <SidebarRegionContainer>
        <i className={buttonStyles} onClick={() => props.toggleAnalytics()}/>
        <SidebarRegionElement/>
      </SidebarRegionContainer>
    </ShellSidebar>
  )
}
