import { AppProps } from '../lib/app/typings';
import { ElementType } from 'react';
import { AnonymousObject } from '../lib/core/typings';

export interface NextAppProps extends AppProps {
  Component: ElementType;
  pageProps: AnonymousObject;
}
