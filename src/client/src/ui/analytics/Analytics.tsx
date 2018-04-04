import * as React from 'react'
import * as _ from 'lodash'
import { PNLChartModel } from './model/pnlChartModel'
import { PNLChart, AnalyticsBarChart, PositionsBubbleChart } from './'
import { PositionsChartModel } from './model/positionsChartModel'
import './AnalyticsStyles.scss'
import { CurrencyPair } from '../../types'
import styled, { css, cx } from 'react-emotion'

export interface AnalyticsProps {
  canPopout: boolean
  isConnected: boolean
  pnlChartModel?: PNLChartModel
  positionsChartModel?: PositionsChartModel,
  currencyPairs: CurrencyPair[]
  onPopoutClick?: () => void
}

const RESIZE_EVENT = 'resize'

export default class Analytics extends React.Component<AnalyticsProps, {}> {

  private handleResize = () => this.forceUpdate()

  componentWillMount() {
    // Resizing the window is causing the nvd3 chart to resize incorrectly. This forces a render when the window resizes
    window.addEventListener(RESIZE_EVENT, this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE_EVENT, this.handleResize)
  }

  render() {
    const { canPopout, isConnected, currencyPairs } = this.props

    const variables = {
      'analytics-header-colour': '#ffffff',
      'barchart-text-color': 'gray',
      'container-bg-color': '#262a33',
      'positive': '#6db910',
      'negative': '#d62728',
    }

    const analyticsContainer = css`
      background-image: linear-gradient(to bottom, #32496a, #1f3351);
    `

    const AnalyticsHeader = styled('div')`
      color: white;
      text-transform: uppercase;
      margin-bottom: 12px;
    `

    const RawAnalyticsControls: React.SFC = ({className, children}: {className?: string, children?: string}) => (
      <div className={cx(className, 'popout__controls')}>
        {children}
      </div>
    )

    const AnalyticsControls = styled(RawAnalyticsControls)`
      float: right;
      color: white;
    `

    const popoutBtnClasses = cx(
      'glyphicon',
      'glyphicon-new-window',
      {['analytics__icon--tearoff--hidden']: canPopout},
      {['analytics__icon--tearoff']: !canPopout}
    )

    const AnalyticsContainerTitle = styled('div')`
      color: white;
    `

    const AnalyticsBubbleChartContainer = styled('div')`
      text-anchor: middle;
      height: 300px;
      display: block;
      position: relative;
      padding-bottom: 2px;
    `

    const AnalyticsBubbleChartTitle = styled('div')`
      color: ${props => props.theme.colors.info || variables['analytics-header-colour']};
      font-family: BrandonMedium;
      font-size: 18px;
      position: absolute;

      width: 100%;
      border-bottom: 1px solid ${props => props.theme.colors.info || variables['analytics-header-colour']}
    `

    const AnalyticsChartContainer = styled('div')`
      position: relative;
      /* background: inherit; */
      width: 100%;
      font-family: BrandonMedium;
      font-size: 14px;
      margin-bottom: 20px;

      .nv-lineChart {
        .nv-axis.nv-y {
          text {
            font-size: 10px;
            fill: ${variables['barchart-text-color']};
            fill: #c2c5c9;
            font-family: BrandonLight;
          }
        }
    
        .nv-axis.nv-x {
          text {
            font-size: 10px;
            fill: ${variables['barchart-text-color']};
            fill: #c2c5c9;
            font-family: BrandonLight;
          }
        }
      }
    `

    const AnalyticsChartTitle = styled('div')`
      color: ${props => props.theme.colors.info || variables['analytics-header-colour']};
      font-family: BrandonMedium;
      font-size: 18px;

      width: 100%;
      border-bottom: 1px solid ${props => props.theme.colors.info || variables['analytics-header-colour']}
    `

    if (!isConnected) {
      return (
        <div className={cx(analyticsContainer, 'analytics__container')}>
          <div ref="analyticsInnerContainer" />
        </div>
      )
    }

    return (
      <div className={cx(analyticsContainer, 'analytics', 'analytics__container', 'animated', 'fadeIn')}>
        <AnalyticsHeader>
          <AnalyticsControls>
            <i className={popoutBtnClasses} onClick={() => this.props.onPopoutClick()} />
          </AnalyticsControls>
          <AnalyticsContainerTitle>Analytics</AnalyticsContainerTitle>
        </AnalyticsHeader>

        {this.props.pnlChartModel &&
        <PNLChart {...this.props.pnlChartModel} />}

        <AnalyticsBubbleChartContainer>
          <AnalyticsBubbleChartTitle>POSITIONS</AnalyticsBubbleChartTitle>
          {!_.isEmpty(this.props.positionsChartModel.seriesData) &&
          <PositionsBubbleChart data={this.props.positionsChartModel.seriesData} currencyPairs={currencyPairs}/>}
        </AnalyticsBubbleChartContainer>

        <AnalyticsChartContainer>
          <AnalyticsChartTitle>PnL</AnalyticsChartTitle>
          {!_.isEmpty(this.props.positionsChartModel.seriesData) &&
          <AnalyticsBarChart chartData={this.props.positionsChartModel.seriesData} currencyPairs={currencyPairs} isPnL={true}/>}
        </AnalyticsChartContainer>
      </div>
    )
  }
}
