import * as _ from 'lodash'
import { createCompositeStatusServiceAction } from './actions'
import { ACTION_TYPES as REF_ACTION_TYPES } from '../referenceService'
import { ServiceInstanceStatus, ServiceStatus } from '../../types'

const getServiceStatus = service => {
  return _.mapValues(service.services, (service: ServiceStatus) => {
    return {
      isConnected: service.isConnected,
      connectedInstanceCount: countInstances(service.instanceStatuses),
      serviceType: service.serviceType
    }
  })
}

export function countInstances(instances) {
  return instances.filter((instance: ServiceInstanceStatus) => instance.isConnected).length
}

export const compositeStatusServiceEpic = compositeStatusService$ => action$ => {
  // On init
  return (
    action$
      .ofType(REF_ACTION_TYPES.REFERENCE_SERVICE)
      // start listening to the serviceStatusStream
      .flatMapTo(compositeStatusService$.serviceStatusStream)
      // for each service status
      .map(service => getServiceStatus(service))
      .map(createCompositeStatusServiceAction)
  )
}
