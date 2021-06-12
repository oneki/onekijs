import { reducer, service } from '@oneki/core';
import { AnyState, State } from '@oneki/types';
import { set } from '@oneki/utils';
import DefaultLocalService from './LocalService';

@service
export default class LocalStateService<S extends State = AnyState> extends DefaultLocalService<S> {
  @reducer
  setState(key: string, value: unknown): void {
    set(this.state, key, value);
  }
}
