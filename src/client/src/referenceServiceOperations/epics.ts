import { createReferenceServiceAction } from './actions'

export const referenceServiceEpic = refService$ => () => {
  return refService$.getCurrencyPairUpdatesStream().map(createReferenceServiceAction)
}
