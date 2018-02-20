import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import SidebarRegionView from './sidebarRegionView'
import { toggleAnalytics } from './operations'

interface SidebarRegionContainerOwnProps {}

interface SidebarRegionContainerStateProps {
  displayAnalytics: boolean
}

interface SidebarRegionContainerDispatchProps {
  toggleAnalytics: () => void
}

type SidebarRegionContainerProps = SidebarRegionContainerOwnProps & SidebarRegionContainerStateProps & SidebarRegionContainerDispatchProps

class SidebarRegionContainer extends React.Component<SidebarRegionContainerProps, any> {
  render() {
    return <SidebarRegionView displayAnalytics={this.props.displayAnalytics} toggleAnalytics={this.props.toggleAnalytics} />
  }
}

const mapStateToProps = ({ displayAnalytics }) => ({
  displayAnalytics
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      toggleAnalytics
    },
    dispatch
  )

const ConnectedSidebarRegionContainer = connect(mapStateToProps, mapDispatchToProps)(SidebarRegionContainer)

export default ConnectedSidebarRegionContainer
