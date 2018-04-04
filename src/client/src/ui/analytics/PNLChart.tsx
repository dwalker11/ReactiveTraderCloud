/* tslint:disable */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// tslint:disable-next-line:noImplicitAny
import * as NVD3Chart from 'react-nvd3'
import { timeFormat } from 'd3-time-format'
import * as numeral from 'numeral'
import styled, { css, cx } from 'react-emotion'

import ChartGradient from './chartGradient'

export interface PnlChartModelOptions {
  xAxis: {
    tickFormat: (string: string) => string,
  },
  yAxis: {
    tickFormat: (number: number) => string,
  }
  showYAxis: boolean
  showXAxis: boolean
  showLegend: boolean
  useInteractiveGuideline: boolean
  duration: number
  margin: {
    left: number
    top: number
    right: number
    bottom: number,
  }
}

export interface PNLChartProps {
  lastPos: number,
  maxPnl: number,
  minPnl: number,
  options: PnlChartModelOptions,
  seriesData: PricePoint[]
}

export interface PricePoint {
  x: Date
  y: string
}

export default class PNLChart extends React.Component<PNLChartProps, {}> {
  chartGradient: ChartGradient
  refs: any

  componentDidMount() {
    this.updateGradient()
  }

  componentDidUpdate() {
    this.updateGradient()
  }

  updateGradient() {
    if (this.refs.pnlChart) {
      if (!this.chartGradient) {
        this.chartGradient = new ChartGradient()
      }
      const chartDomElement = ReactDOM.findDOMNode(this.refs.pnlChart)
      if (chartDomElement) {
        this.chartGradient.update(chartDomElement, this.props.minPnl, this.props.maxPnl)
      }
    }
  }

  prepareDatum(seriesData: PricePoint[]) {
    return [{
      series: 'PNL',
      label: 'PNL',
      area: true,
      color: 'slategray',
      values: seriesData
    }]
  }

  render() {
    const { lastPos, minPnl, maxPnl, options, seriesData } = this.props

    const formattedLastPos = numeral(lastPos).format()

    let pnlChart: any = null

    if (this.props.seriesData.length >= 0) {
      const configurePnLChart = (chart: any) => {
        const pnlTooltip = (el: any) => {
          const date = timeFormat('%X')(new Date(el.value))
          const formatted = numeral(el.series[0].value).format('0.0a')

          return `<p class="analytics__chart-tooltip">
            <strong class="analytics__chart-tooltip-date">${date}:</strong> 
            ${formatted}
          </p>`
        }

        chart.yDomain([minPnl, maxPnl]).yRange([150, 0])
        chart.interactiveLayer.tooltip.contentGenerator(pnlTooltip)
      }

      options.xAxis = { tickFormat: (d: string) => timeFormat('%X')(new Date(d)) }
      options.yAxis = { tickFormat: (d: number) => numeral(d).format('0.0a') }

      pnlChart =
        <NVD3Chart
          ref="pnlChart"
          type="lineChart"
          datum={this.prepareDatum(seriesData)}
          options={options}
          height={240}
          configure={configurePnLChart}/>
    } else {
      pnlChart = (<div>No PNL data yet</div>)
    }

    const variables = {
      'analytics-header-colour': '#ffffff',
      'barchart-text-color': 'gray',
      'positive': '#6db910',
      'negative': '#d62728',
    }

    const AnalyticsHeader = styled('div')`
      font-size: 16px;
      color: ${variables['analytics-header-colour']};
      /* padding-bottom: 10px; */

      border-bottom: 1px solid ${props => props.theme.colors.info || variables['analytics-header-colour']}
    `

    const AnalyticsHeaderTitle = styled('span')`
      color: ${props => props.theme.colors.info || variables['analytics-header-colour']};
      padding-bottom: 2px;
      font-family: BrandonRegular;
      /* font-size: 24px; */
      /* display: block; */
    `

    const analyticsHeaderValueNegative = css`
      color: ${variables['negative-color']}
    `

    const analyticsHeaderValuePositive = css`
      color: ${variables['positive-color']};
    `

    const RawAnalyticsHeaderValue: React.SFC = ({className, children}: {className?: string, children?: string}) => {
      const styles = cx(
        className,
        { [analyticsHeaderValueNegative]: lastPos < 0 },
        { [analyticsHeaderValuePositive]: lastPos > 0 }
      )

      return (
        <span className={styles}>
          {children}
        </span>
      )
    }

    const AnalyticsHeaderValue = styled(RawAnalyticsHeaderValue)`
      font-weight: bold;
      font-family: BrandonRegular;
      
      float: right;
    `

    const AnalyticsChartContainer = styled('div')`
      position: relative;
      background: inherit;
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

    return (
      <div>
        <AnalyticsHeader>
          <AnalyticsHeaderTitle>PROFIT AND LOSS</AnalyticsHeaderTitle>
          <AnalyticsHeaderValue>USD {formattedLastPos}</AnalyticsHeaderValue>
        </AnalyticsHeader>
        <AnalyticsChartContainer>
          {pnlChart}
        </AnalyticsChartContainer>
      </div>
    )
  }
}
