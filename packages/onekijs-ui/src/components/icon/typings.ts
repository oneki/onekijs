import { ColorProperty } from 'csstype';
import { ColorPropertyTheme } from '../../styles/typings';

export type SearchIconProps = React.InputHTMLAttributes<HTMLDivElement> & {
  color?: ColorPropertyTheme | ColorProperty;
};

export type MenuIconProps = React.InputHTMLAttributes<HTMLDivElement> & {
  color?: ColorPropertyTheme | ColorProperty;
};
