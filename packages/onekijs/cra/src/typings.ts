import { History, LocationState } from 'history';
import { AppProps as CoreAppProps } from 'onekijs';

export interface AppProps extends CoreAppProps {
  history?: History<LocationState>;
}
