import { combineReducers } from 'redux'
import { connectionStatusReducer, compositeStatusServiceReducer, currencyPairReducer, pricingServiceReducer } from './root'
import { analyticsReducer } from './ui_analytics'
import { blotterReducer } from './ui_blotter'
import { footerReducer } from './ui_footer'
import { regionsReducer } from './ui_regions'
import { sidebarRegionReducer } from './ui_sidebar'
import { spotTileDataReducer } from './ui_spotTile'
import { notionalsReducer } from './ui_spotTile_notional'

const rootReducer = combineReducers({
  blotterService: blotterReducer,
  currencyPairs: currencyPairReducer,
  pricingService: pricingServiceReducer,
  analyticsService: analyticsReducer,
  compositeStatusService: compositeStatusServiceReducer,
  connectionStatus: connectionStatusReducer,
  displayAnalytics: sidebarRegionReducer,
  displayStatusServices: footerReducer,
  regionsService: regionsReducer,
  notionals: notionalsReducer,
  spotTilesData: spotTileDataReducer
})

export default rootReducer
