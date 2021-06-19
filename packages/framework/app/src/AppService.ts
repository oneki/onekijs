import { DefaultService } from '@oneki/core';
import { AnyState, AppContext, AppService, State } from '@oneki/types';

export default class DefaultAppService<S extends State = AnyState> extends DefaultService<S> implements AppService<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
