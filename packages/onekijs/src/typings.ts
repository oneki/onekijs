import { History, LocationState } from 'history';
import { AppProps as CoreAppProps } from 'onekijs-framework';

export interface AppProps extends CoreAppProps {
  history?: History<LocationState>;
}
