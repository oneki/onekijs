import { asyncGet, inject, LocalService, NotificationService, reducer, saga, SagaEffect, service } from 'onekijs';

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
export default class AvailabilityService extends LocalService<AvailabilityState> {
  notificationService = inject(NotificationService);

  // constructor(notificationService: NotificationService) {
  //   super();
  //   // this.notificationService = notificationService;
  // }

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @saga(SagaEffect.Latest)
  *checkAvailability(productId: number) {
    try {
      yield this.setLoading(true);
      const data: AvailabilityResponse = yield asyncGet(`/products/${productId}/availability`);
      yield this.setData(data);
    } catch (error) {
      this.notificationService.error(error);
    }
  }
}
