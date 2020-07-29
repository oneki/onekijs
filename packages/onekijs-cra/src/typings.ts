import { History, LocationState } from 'history';
import { AppProps } from 'onekijs';

export interface CraAppProps extends AppProps {
  history?: History<LocationState>;
}
