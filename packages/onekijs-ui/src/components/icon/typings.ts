import { ColorProperty } from 'csstype';
import { ColorPropertyTheme } from '../../styles/typings';

export type IconProps = React.InputHTMLAttributes<HTMLDivElement> & {
  color?: ColorPropertyTheme | ColorProperty;
};

export type TogglerIconProps = IconProps & {
  open?: boolean;
  loading?: boolean;
  visible?: boolean;
};
