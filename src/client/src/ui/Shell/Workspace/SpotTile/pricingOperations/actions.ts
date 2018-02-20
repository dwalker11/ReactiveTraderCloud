import { createAction } from 'redux-actions'

export enum ACTION_TYPES {
  SPOT_PRICES_UPDATE = '@ReactiveTraderCloud/SPOT_PRICES_UPDATE',
  PRICING_SERVICE_STATUS_UPDATE = '@ReactiveTraderCloud/PRICING_SERVICE_STATUS_UPDATE',
  PRICING_STALE = '@ReactiveTraderCloud/PRICING_STALE'
}

export const createSpotPricesUpdateAction = createAction(ACTION_TYPES.SPOT_PRICES_UPDATE)
export const createPricingServiceStatusUpdateAction = createAction(ACTION_TYPES.PRICING_SERVICE_STATUS_UPDATE)
export const createStalePriceAction = createAction(ACTION_TYPES.PRICING_STALE)
