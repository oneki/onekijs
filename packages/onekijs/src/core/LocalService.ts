import Service from './Service';
import { AnyState, State, AppService } from './typings';
import AppContext from '../app/AppContext';

export default class LocalService<S extends State = AnyState> extends Service<S> implements AppService<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;  
}
