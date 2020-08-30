import { History, LocationState } from 'history';
import { AppProps } from 'onekijs-core';

export interface CraAppProps extends AppProps {
  history?: History<LocationState>;
}
