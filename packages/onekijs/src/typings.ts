import { CoreAppProps } from '@oneki/app';
import { History, LocationState } from 'history';

export interface AppProps extends CoreAppProps {
  history?: History<LocationState>;
}
