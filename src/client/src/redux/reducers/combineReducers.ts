import { combineReducers } from 'redux'
import { blotterReducer } from '../../ui/blotter/'
import { currencyPairReducer } from './currencyPairsReducer'
import { pricingServiceReducer } from './pricingReducer'
import compositeStatusServiceReducer from './compositeStatusServiceOperations'
import connectionStatusReducer from '../root/connectionStatusOperations'
import { analyticsReducer } from '../../ui/analytics'
import sidebarRegionReducer from '../ui_sidebar/SidebarRegionOperations'
import footerReducer from '../ui_footer/FooterOperations'
import notionalsReducer from '../ui_spotTile_notional/NotionalOperations'
import { regionsReducer } from '../ui_regions/regionsOperations'
import { spotTileDataReducer } from '../../ui/spotTile'

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
