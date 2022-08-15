/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  asyncGet,
  DefaultLocalService,
  inject,
  NotificationService,
  reducer,
  saga,
  SagaEffect,
  service,
} from 'onekijs-next';

export interface AvailabilityState {
  // a flag to indicate if a request is in flight
  loading: boolean;

  // the result of the request
  // initial value is undefined
  available?: boolean; // number of products available
}

// Reponse returned by the server
interface AvailabilityResponse {
  available: boolean; // number of products available
}

@service
export default class AvailabilityService extends DefaultLocalService<AvailabilityState> {
  notificationService = inject(NotificationService);

  @reducer
  setLoading(loading: boolean): void {
    // the state is immutable
    // however, the @reducer annotation allows updating the state
    // like any other object (thanks to immer)
    this.state.loading = loading;
  }

  @reducer
  setData(data: AvailabilityResponse): void {
    this.state.available = data.available;
    this.setLoading(false); // A reducer can call another reducer
  }

  @saga(SagaEffect.Latest)
  *checkAvailability(productId: number) {
    try {
      yield this.setLoading(true);
      const data: AvailabilityResponse = yield asyncGet(`/api/products/${productId}/availability`);
      yield this.setData(data);
    } catch (error) {
      this.notificationService.error(error);
    }
  }
}
