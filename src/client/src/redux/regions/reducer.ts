import { ACTION_TYPES } from './actions'

const changeRegionTearOffStatus = (state, payload, status) => ({
  ...state,
  [payload.id]: {
    ...state[payload.id],
    isTearedOff: status
  }
})

export const regionsReducer = (state: any = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.REGION_ADD:
      const newRegion = action.payload
      return {
        [newRegion.id]: newRegion,
        ...state
      }
    case ACTION_TYPES.REGION_ATTACH_WINDOW:
      return changeRegionTearOffStatus(state, action.payload, false)
    case ACTION_TYPES.REGION_TEAROFF_WINDOW:
      return changeRegionTearOffStatus(state, action.payload, true)
    default:
      return state
  }
}
