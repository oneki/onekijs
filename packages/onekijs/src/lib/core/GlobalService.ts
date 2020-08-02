import Service, { run, dispatch, sagas, reducers, stop } from './Service';
import { AnyState, State, ID, AppService } from './typings';
import AppContext from '../app/AppContext';

export default class GlobalService<S extends State = AnyState> extends Service<S> implements AppService<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;  

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
