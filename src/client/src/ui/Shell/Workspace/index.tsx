import * as _ from 'lodash'
import * as React from 'react'
import './styles/WorkspaceContainerStyles.scss'
import { connect } from 'react-redux'
import ConnectedSpotTileContainer from './SpotTile'
import RegionWrapper from '../../common/regions/RegionWrapper'
import { createDeepEqualSelector } from '../../utils/mapToPropsSelectorFactory'

interface WorkspaceContainerOwnProps {}

interface WorkspaceContainerStateProps {
  spotTileKeys: string[]
}

interface WorkspaceContainerDispatchProps {}

type WorkspaceContainerProps = WorkspaceContainerOwnProps & WorkspaceContainerStateProps & WorkspaceContainerDispatchProps

// Presentational component
export class WorkspaceContainer extends React.Component<WorkspaceContainerProps, {}> {
  render() {
    return (
      <div className="shell__workspace">
        <div className="workspace-region">{this.renderItems()}</div>
      </div>
    )
  }

  renderItems() {
    const { spotTileKeys } = this.props
    if (!spotTileKeys || spotTileKeys.length === 0) {
      return (
        <div className="workspace-region__icon--loading">
          <i className="fa fa-5x fa-cog fa-spin" />
        </div>
      )
    }

    return spotTileKeys
      .map(key => (
        <RegionWrapper key={key} region={key}>
          <div className="workspace-region__item">
            <ConnectedSpotTileContainer id={key} />
          </div>
        </RegionWrapper>
      ))
      .concat(_.times(6, i => <div key={i} className="workspace-region__spacer" />))
  }
}

const getSpotTileKeys = createDeepEqualSelector((state: any) => Object.keys(state.currencyPairs), spotTilesKeys => spotTilesKeys)

function mapStateToProps(state: any) {
  return {
    spotTileKeys: getSpotTileKeys(state)
  }
}

// The Actual container
export default connect(mapStateToProps)(WorkspaceContainer)
