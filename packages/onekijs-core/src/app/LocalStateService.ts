import { set } from '../utils/object';
import { service, reducer } from '../core/annotations';
import DefaultLocalService from './LocalService';
import { AnyState, State } from '../typings/state';

@service
export default class LocalStateService<S extends State = AnyState> extends DefaultLocalService<S> {
  @reducer
  setState(key: string, value: unknown): void {
    set(this.state, key, value);
  }
}
