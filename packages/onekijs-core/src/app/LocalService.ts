import { AppContext } from '../typings/app';
import { LocalService } from '../typings/service';
import { AnyState, State } from '../typings/state';
import DefaultAppService from './AppService';

export default class DefaultLocalService<S extends State = AnyState> extends DefaultAppService<S>
  implements LocalService {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
