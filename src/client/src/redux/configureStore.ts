import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'

import rootReducer from './combineReducers'
import { blotterEpic } from '../ui/blotter/index'
import { referenceServiceEpic } from './root/referenceDataActions'
import { pricingServiceEpic } from './root/pricingActions'
import { analyticsServiceEpic } from '../ui/analytics/index'
import { compositeStatusServiceEpic } from './root/compositeStatusServiceOperations'
import { connectionStatusEpicsCreator } from './root/connectionStatusOperations'
import { popoutEpic } from './root/popoutEpic'
import { spotTileEpicsCreator } from '../ui/spotTile/index'
import { footerEpic } from './ui_footer/FooterOperations'

const epicMiddleware = (referenceDataService, blotterService, pricingService, analyticsService, compositeStatusService, executionService, openFin) => createEpicMiddleware(
  combineEpics(
    referenceServiceEpic(referenceDataService),
    blotterEpic(blotterService, openFin),
    pricingServiceEpic(pricingService, openFin, referenceDataService),
    analyticsServiceEpic(analyticsService, openFin),
    compositeStatusServiceEpic(compositeStatusService),
    connectionStatusEpicsCreator(compositeStatusService),
    spotTileEpicsCreator(executionService, referenceDataService, openFin),
    popoutEpic(),
    footerEpic(openFin),
  ),
)

export default function configureStore(referenceDataService, blotterService, pricingService, analyticsService, compositeStatusService, executionService, openFin) {
  const middleware = epicMiddleware(referenceDataService, blotterService, pricingService, analyticsService, compositeStatusService, executionService, openFin)

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(middleware),
    ),
  )
  persistStore(store)
  return store
}
