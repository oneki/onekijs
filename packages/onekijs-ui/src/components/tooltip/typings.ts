import { Config, PopperOptions } from 'react-popper-tooltip';
import { ColorPropertyTheme } from '../../styles/typings';

export interface TooltipProps extends Config {
  content?: string | JSX.Element;
  className?: string;
  popperOptions?: PopperOptions;
  kind?: ColorPropertyTheme;
}
