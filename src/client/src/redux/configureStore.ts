import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { persistStore } from 'redux-persist'
import { analyticsServiceEpic, analyticsReducer } from './analytics'
import { blotterEpic, blotterReducer } from './blotter'
import { compositeStatusServiceEpic, compositeStatusServiceReducer } from './compositeStatusService'
import { connectionStatusEpicsCreator, connectionStatusReducer } from './connectionStatus'
import { footerEpic, footerReducer } from './footer'
import { popoutEpic } from './popouts'
import { pricingServiceEpic, pricingServiceReducer } from './pricingService'
import { referenceServiceEpic } from './referenceService'
import { spotTileEpicsCreator, spotTileDataReducer } from './spotTile'
import { notionalsReducer } from './notional'
import { sidebarRegionReducer } from './sidebarRegion'
import { currencyPairReducer } from './currencyPairs'
import { regionsReducer } from './regions'

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
