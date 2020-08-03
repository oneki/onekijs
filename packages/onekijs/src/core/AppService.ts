import { State, AnyState } from './typings';
import Service from './Service';
import AppContext from '../app/AppContext';

export default class AppService<S extends State = AnyState> extends Service<S> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  public context: AppContext = null!;
}
