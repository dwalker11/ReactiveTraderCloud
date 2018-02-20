import { createAction } from 'redux-actions'
import { ACTION_TYPES as REGIONS_ACTIONS } from '../../regions/operations/actions'

export const popoutOpened = createAction(REGIONS_ACTIONS.REGION_TEAROFF_WINDOW, payload => payload)
export const popoutClosed = createAction(REGIONS_ACTIONS.REGION_ATTACH_WINDOW, payload => payload)
