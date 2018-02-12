import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { persistStore } from 'redux-persist'
import rootReducer from './combineReducers'
import { compositeStatusServiceEpic, connectionStatusEpicsCreator, popoutEpic, pricingServiceEpic, referenceServiceEpic } from './root'
import { analyticsServiceEpic } from './ui_analytics'
import { blotterEpic } from './ui_blotter'
import { footerEpic } from './ui_footer'
import { spotTileEpicsCreator } from './ui_spotTile'

const epicMiddleware = (referenceDataService, blotterService, pricingService, analyticsService, compositeStatusService, executionService, openFin) =>
  createEpicMiddleware(
    combineEpics(
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
  )

export default function configureStore(
  referenceDataService,
  blotterService,
  pricingService,
  analyticsService,
  compositeStatusService,
  executionService,
  openFin
) {
  const middleware = epicMiddleware(referenceDataService, blotterService, pricingService, analyticsService, compositeStatusService, executionService, openFin)
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(middleware)))
  persistStore(store)

  return store
}
