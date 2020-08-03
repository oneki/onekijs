import AppContext from '../app/AppContext';
import AppService from './AppService';
import { AnyState, State } from './typings';

export default class LocalService<S extends State = AnyState> extends AppService<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
