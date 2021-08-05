import DefaultService from '../core/Service';
import { AppContext } from '../types/app';
import { AppService } from '../types/service';
import { AnyState, State } from '../types/state';

export default class DefaultAppService<S extends State = AnyState> extends DefaultService<S> implements AppService<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
