import { set } from '../core/utils/object';
import { service, reducer } from '../core/annotations';
import GlobalService from '../core/GlobalService';

@service
export default class GlobalStateService extends GlobalService {
  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setState(key: string, value: any): void {
    set(this.state, key, value);
  }
}
