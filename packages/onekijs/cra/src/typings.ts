import { History, LocationState } from 'history';
import { CoreAppProps } from 'onekijs';

export interface AppProps extends CoreAppProps {
  history?: History<LocationState>;
}
