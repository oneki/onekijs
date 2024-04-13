import { AppProps as CoreAppProps } from 'onekijs-framework';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppProps extends CoreAppProps, AppRouterProps {}

export interface AppRouterProps {
  basename?: string;
}