import { AnyState, DefaultLocalService, reducer, service } from 'onekijs';

export interface MyLocalState extends AnyState {
  foo: string;
}

@service
export class MyLocalService extends DefaultLocalService<MyLocalState> {
  @reducer
  setFoo(value: string): void {
    this.state.foo = value;
  }
}
