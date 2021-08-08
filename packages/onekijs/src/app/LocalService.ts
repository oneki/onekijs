import { LocalService } from '../types/service';
import { AnyState, State } from '../types/state';
import AppContext from './AppContext';
import DefaultAppService from './AppService';

export default class DefaultLocalService<S extends State = AnyState> extends DefaultAppService<S>
  implements LocalService {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
