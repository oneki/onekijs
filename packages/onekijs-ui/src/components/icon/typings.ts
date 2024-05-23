import { Property } from 'csstype';
import { ColorPropertyTheme, SpacingPropertyTheme, TLength } from '../../styles/typings';

export type IconProps = React.InputHTMLAttributes<HTMLDivElement> & {
  color?: ColorPropertyTheme | Property.Color;
  marginRight?: SpacingPropertyTheme| Property.MarginRight<TLength>;
  marginLeft?: SpacingPropertyTheme| Property.MarginLeft<TLength>;
};

export type TogglerIconProps = IconProps & {
  open?: boolean;
  loading?: boolean;
  visible?: boolean;
  model?: 'arrow' | 'plus';
  closeArrowPosition?: 'e' | 'w' | 'n' | 's';
  openArrowPosition?: 'e' | 'w' | 'n' | 's';
};
