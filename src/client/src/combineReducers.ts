import { combineReducers } from 'redux'
import compositeStatusServiceReducer from './compositeStatusServiceOperations'
import connectionStatusReducer from './connectionStatusOperations'
import { currencyPairReducer } from './currencyPairsOperations'
import { pricingServiceReducer } from './pricingOperations'
import { analyticsReducer } from './ui/Analytics'
import { blotterReducer } from './ui/Blotter'
import { regionsReducer } from './ui/common/regions/regionsOperations'
import { footerReducer } from './ui/Footer'
import { notionalsReducer } from './ui/Notional'
import { sidebarRegionReducer } from './ui/SidebarRegion'
import { spotTileDataReducer } from './ui/spotTile/index'

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
