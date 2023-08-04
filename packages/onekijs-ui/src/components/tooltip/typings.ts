import { ReactNode } from 'react';
import { Config, PopperOptions } from 'react-popper-tooltip';
import { ColorPropertyTheme } from '../../styles/typings';

export interface TooltipProps extends Config {
  content?: ReactNode;
  className?: string;
  popperOptions?: PopperOptions;
  kind?: ColorPropertyTheme;
  delayHide?: number;
  attachToBody?: boolean;
}
