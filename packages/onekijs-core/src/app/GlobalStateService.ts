import { set } from '../utils/object';
import { service, reducer } from '../core/annotations';
import DefaultGlobalService from './GlobalService';

@service
export default class GlobalStateService extends DefaultGlobalService {
  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setState(key: string, value: any): void {
    set(this.state, key, value);
  }
}
