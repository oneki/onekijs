import DefaultService from '../core/Service';
import { AppService } from '../typings/service';
import { AppContext } from '../typings/app';
import { AnyState, State } from '../typings/state';

export default class DefaultAppService<S extends State = AnyState> extends DefaultService<S> implements AppService<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
