import { AppProps as NextAppProps } from 'next/app';
import { AppProps as CoreAppProps } from '../../app/typings';

export interface AppProps extends CoreAppProps, NextAppProps {}
