import { AppProps as NextAppProps } from 'next/app';
import { CoreAppProps } from 'onekijs';

export interface AppProps extends CoreAppProps, NextAppProps {}
