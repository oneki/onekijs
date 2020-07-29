import { set } from '../core/utils/object';
import { service, reducer } from '../core/annotations';
import LocalService from '../core/LocalService';
import { State, AnyState } from '../core/typings';

@service
export default class LocalStateService<S extends State = AnyState> extends LocalService<S> {
  @reducer
  setState(key: string, value: unknown): void {
    set(this.state, key, value);
  }
}
