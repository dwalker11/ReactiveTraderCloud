import { ACTION_TYPES, openLinks } from './actions'

export const footerEpic = openFin => action$ => {
  return action$.ofType(ACTION_TYPES.OPEN_LINK).map(action => openLinks(openFin))
}

export default footerEpic
