import { AppProps } from '../lib/app/typings';
import { History, LocationState } from 'history';

export interface CraAppProps extends AppProps {
  history?: History<LocationState>;
}
