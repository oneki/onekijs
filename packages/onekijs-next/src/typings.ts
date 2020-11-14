import { CoreAppProps } from 'onekijs-core';
import { AppProps as NextAppProps } from 'next/app';

export interface AppProps extends CoreAppProps, NextAppProps {}
