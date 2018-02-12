import { createAction } from 'redux-actions'

export const regionsSettings = (title, width, height, dockable) => {
  return {
    title,
    width,
    height,
    dockable
  }
}

export const ACTION_TYPES = {
  REGION_ADD: '@ReactiveTraderCloud/REGION_ADD',
  REGION_OPEN_WINDOW: '@ReactiveTraderCloud/REGION_OPEN_WINDOW',
  REGION_TEAROFF_WINDOW: '@ReactiveTraderCloud/REGION_TEAROFF_WINDOW',
  REGION_ATTACH_WINDOW: '@ReactiveTraderCloud/REGION_ATTACH_WINDOW'
}

// onPopoutClick
export const openWindow = createAction(ACTION_TYPES.REGION_OPEN_WINDOW, (payload, openFin) => ({ ...payload, openFin }))
// onComponentMount
export const addRegion = createAction(ACTION_TYPES.REGION_ADD, payload => payload)
