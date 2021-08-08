import { History, LocationState } from 'history';
import { AppProps as CoreAppProps } from '../../app/typings';

export interface AppProps extends CoreAppProps {
  history?: History<LocationState>;
}
