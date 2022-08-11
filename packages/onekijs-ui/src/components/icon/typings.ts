import { ColorProperty } from 'csstype';
import { ColorPropertyTheme } from '../../styles/typings';

export type IconProps = React.InputHTMLAttributes<HTMLDivElement> & {
  color?: ColorPropertyTheme | ColorProperty;
};

export type TogglerIconProps = IconProps & {
  open?: boolean;
  loading?: boolean;
  visible?: boolean;
  model?: 'arrow' | 'plus';
  closeArrowPosition?: 'e' | 'w' | 'n' | 's';
  openArrowPosition?: 'e' | 'w' | 'n' | 's';
};
