import AppService from './AppService';
import { dispatch, reducers, run, sagas, stop } from './Service';
import { AnyState, ID, State } from './typings';

export default class GlobalService<S extends State = AnyState> extends AppService<S> {
  [run](): void {
    this[dispatch] = this.context.store.dispatch;
    this.context.store.injectReducers(this, (this.constructor as any)[ID], this[reducers]);
    Object.keys(this[sagas]).forEach((type) => {
      this.context.store.runSaga((this.constructor as any)[ID], this[sagas][type], type);
    });
  }

  [stop](): void {
    this[dispatch] = null;
    this.context.store.removeReducers((this.constructor as any)[ID], this[reducers]);
    Object.keys(this[sagas]).forEach((type) => {
      this.context.store.cancelSaga((this.constructor as any)[ID], type);
    });
  }
}
