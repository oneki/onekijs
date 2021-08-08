import { reducer, service } from '../core/annotations';
import { AnyState, State } from '../types/state';
import { set } from '../utils/object';
import DefaultLocalService from './LocalService';

@service
export default class LocalStateService<S extends State = AnyState> extends DefaultLocalService<S> {
  @reducer
  setState(key: string, value: unknown): void {
    set(this.state, key, value);
  }
}
