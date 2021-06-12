import { set } from '@oneki/utils';
import { service, reducer } from '@oneki/core';
import DefaultGlobalService from './GlobalService';

@service
export default class GlobalStateService extends DefaultGlobalService {
  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setState(key: string, value: any): void {
    set(this.state, key, value);
  }
}
