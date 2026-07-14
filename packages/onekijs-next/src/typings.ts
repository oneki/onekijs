import { AnonymousObject, AppProps as CoreAppProps, FCC } from 'onekijs-framework';

export interface AppProps extends CoreAppProps {
  Theme?: FCC<AnonymousObject>;
}
