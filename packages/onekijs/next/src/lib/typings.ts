import { AppProps as NextAppProps } from 'next/app';
import { CoreAppProps } from '@oneki/app';

export interface AppProps extends CoreAppProps, NextAppProps {}
