import * as _ from 'lodash'
import * as React from 'react'
import './WorkspaceContainerStyles.scss'
import { connect } from 'react-redux'
import RegionWrapper from '../common/regions/RegionWrapper'
import ConnectedSpotTileContainer from '../spotTile/SpotTileContainer'
import { createDeepEqualSelector } from '../utils/mapToPropsSelectorFactory'
import styled from 'react-emotion'

const variables = {
  'scrollbar-width': '8px',
  'blotter-height': '20vh',
  'workspace-height': `calc(100% - 20vh)`, // calc(100% - #{$blotter-height})
  'workspace-width': `calc(100% - 8px)` // calc(100% - #{$scrollbar-width})
}

const ShellWorkspace = styled('div')`
  flex-grow: 1;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  width: ${variables['workspace-width']};
  order: 1;
`

const WorkspaceRegion = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  position: relative;
`
const WorkspaceRegionIcon = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 75px;
  height: 75px;
`
const WorkspaceRegionItem = styled('div')`
  flex: 1 340px;
  align-self: auto;
  margin: 5px;

  @media all and (max-width: 700px) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
`
const WorkspaceRegionSpacer = styled('div')`
  flex: 1 340px;
  align-self: auto;
  margin: 5px;
`

interface WorkspaceContainerOwnProps {}

interface WorkspaceContainerStateProps {
  spotTileKeys: string[]
}

interface WorkspaceContainerDispatchProps {}

type WorkspaceContainerProps =
  WorkspaceContainerOwnProps
  & WorkspaceContainerStateProps
  & WorkspaceContainerDispatchProps

// TODO: Add bindings for E2E tests
export class WorkspaceContainer extends React.Component<WorkspaceContainerProps, {}> {
  render() {
    return (
      <ShellWorkspace>
        <WorkspaceRegion>
          {this.renderItems()}
        </WorkspaceRegion>
      </ShellWorkspace>
    )
  }

  renderItems() {
    const { spotTileKeys } = this.props

    if (!spotTileKeys || spotTileKeys.length === 0) {
      return <WorkspaceRegionIcon><i className="fa fa-5x fa-cog fa-spin"/></WorkspaceRegionIcon>
    }

    return spotTileKeys
      .map(key => (
        <RegionWrapper key={key} region={key}>
          <WorkspaceRegionItem>
            <ConnectedSpotTileContainer id={key}/>
          </WorkspaceRegionItem>
        </RegionWrapper>
      )).concat(_.times(6, i => <WorkspaceRegionSpacer key={i}/>))
  }
}

const getSpotTileKeys = createDeepEqualSelector(
  (state: any) => Object.keys(state.currencyPairs),
  (spotTilesKeys) => spotTilesKeys
)

const mapStateToProps = (state: any) => {
  return {
    spotTileKeys: getSpotTileKeys(state)
  }
}

export default connect(mapStateToProps)(WorkspaceContainer)
