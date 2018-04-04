import { Direction, NotificationType, Trade } from '../../src/types'
import { Notification } from '../../src/types/notification'
import { SpotTileProps } from '../../src/ui/spotTile/SpotTile'

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const getContainerStyling = {
  margin: '50px auto 0',
  width: '30%',
  minWidth: '300px',
  padding: '5px'
}

export const getSpotTileProps: () => SpotTileProps = (
  executionConnected: boolean = true,
  isTradeExecutionInFlight: boolean = false
) => {
  return {
    executionConnected,
    isTradeExecutionInFlight,
    canPopout: true,
    currencyChartIsOpening: false,
    currentSpotPrice: {
      ask: getButtonProps('ask', () => {}).rate,
      bid: getButtonProps('ask', () => {}).rate,
      priceMovementType: 'Up',
      spread: {
        formattedValue: '-1.23'
      },
      valueDate: 1234436547
    },
    hasNotification: false,
    maxNotional: 5000000,
    notification: {
      error: null,
      notificationType: NotificationType.Trade,
      hasError: false
    },
    notional: 500,
    priceStale: false,
    title: 'GBP / USD',
    currencyPair: {
      symbol: 'GBP',
      base: 'GBP',
      ratePrecision: 0,
      pipsPosition: 0,
      terms: ''
    },
    spotTileData: null,
    pricingConnected: false,
    isRunningInOpenFin: false,
    onComponentMount: () => {},
    executeTrade: () => {},
    onPopoutClick: () => {},
    undockTile: () => {},
    displayCurrencyChart: () => {},
    onNotificationDismissedClick: () => {}
  }
}

export const getButtonProps = (type: string, action: any) => {
  const classNameType = type === 'Sell' ? 'bid' : 'ask'

  return {
    className: `spot-tile__price spot-tile__price--${classNameType}`,
    direction: Direction[type],
    rate: {
      pips: getRandomNumber(0, 99),
      bigFigure: getRandomNumber(0, 150),
      pipFraction: getRandomNumber(0, 9),
      rawRate: 123
    },
    onExecute: action('buy clicked')
  }
}

export const getNotionalInputProps = {
  className: 'spot-tile__notional',
  notional: 1000000,
  currencyPair: { symbol: 'GBP', base: 'GBP', ratePrecision: 0, pipsPosition: 0, terms: '' },
  onChange: () => console.log('Changed'),
  maxValue: 5000000,
  onNotionalInputChange: () => {}
}

export const getPriceMovementIndicatorProps = (priceMovementType: string, formattedValue: string) => {
  return {
    priceMovementType,
    spread: {
      formattedValue
    }
  }
}

export const getRandomTrade = (direction: string, status: string): Trade => {
  return {
    status,
    direction,
    tradeId: getRandomNumber(1, 10000),
    traderName: 'YYY',
    symbol: 'GBPUSD',
    notional: getRandomNumber(40, 5222),
    dealtCurrency: 'GBP',
    termsCurrency: 'USD',
    spotRate: 123,
    tradeDate: new Date(),
    valueDate: new Date()
  }
}

export const getTradeNotification = (status: string, direction: string, hasError: boolean): Notification => {
  return {
    hasError,
    notificationType: NotificationType.Trade,
    trade: getRandomTrade(direction, status)
  }
}
