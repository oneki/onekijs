import { AnyState, AppContext, LocalService, State } from '@oneki/types';
import DefaultAppService from './AppService';

export default class DefaultLocalService<S extends State = AnyState> extends DefaultAppService<S>
  implements LocalService {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
