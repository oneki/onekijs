import { History, LocationState } from 'history';
import { CoreAppProps } from 'onekijs-core';

export interface AppProps extends CoreAppProps {
  history?: History<LocationState>;
}
