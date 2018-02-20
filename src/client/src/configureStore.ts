import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { persistStore } from 'redux-persist'
import { compositeStatusServiceEpic, compositeStatusServiceReducer } from './compositeStatusOperations'
import { connectionStatusEpicsCreator, connectionStatusReducer } from './connectionStatusOperations'
import { currencyPairReducer } from './currencyPairsOperations'
import { referenceServiceEpic } from './referenceServiceOperations'
import { popoutEpic } from './ui/common/popout/operations'
import { regionsReducer } from './ui/common/regions/operations'
import { blotterEpic, blotterReducer } from './ui/Shell/Blotter/operations'
import { footerEpic, footerReducer } from './ui/Shell/Footer/operations'
import { sidebarRegionReducer } from './ui/Shell/SidebarRegion/operations'
import { analyticsServiceEpic, analyticsReducer } from './ui/Shell/SidebarRegion/Analytics/operations'
import { spotTileEpicsCreator, spotTileDataReducer } from './ui/Shell/Workspace/SpotTile/operations'
import { pricingServiceEpic, pricingServiceReducer } from './ui/Shell/Workspace/SpotTile/pricingOperations'
import { notionalsReducer } from './ui/Shell/Workspace/SpotTile/Notional/operations'

export default function configureStore(
  referenceDataService,
  blotterService,
  pricingService,
  analyticsService,
  compositeStatusService,
  executionService,
  openFin
) {
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

  const epics = combineEpics(
    referenceServiceEpic(referenceDataService),
    blotterEpic(blotterService, openFin),
    pricingServiceEpic(pricingService, openFin, referenceDataService),
    analyticsServiceEpic(analyticsService, openFin),
    compositeStatusServiceEpic(compositeStatusService),
    connectionStatusEpicsCreator(compositeStatusService),
    spotTileEpicsCreator(executionService, referenceDataService, openFin),
    popoutEpic(),
    footerEpic(openFin)
  )

  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(createEpicMiddleware(epics))))
  persistStore(store)

  return store
}
