import { AppProps as NextAppProps } from 'next/app';
import { AppProps as CoreAppProps } from 'onekijs';

export interface AppProps extends CoreAppProps, NextAppProps {}
