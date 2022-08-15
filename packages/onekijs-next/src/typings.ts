import { AppProps as NextAppProps } from 'next/app';
import { AnonymousObject, AppProps as CoreAppProps, FCC } from 'onekijs-framework';

export interface AppProps extends CoreAppProps, NextAppProps {
  Theme?: FCC<AnonymousObject>;
}
