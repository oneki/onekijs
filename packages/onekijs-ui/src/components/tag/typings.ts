import { BackgroundColorProperty, ColorProperty } from 'csstype';
import { ColorPropertyTheme } from '../../styles/typings';

export type TagProps = {
  kind?: ColorPropertyTheme;
  bgColor?: ColorPropertyTheme | BackgroundColorProperty;
  fontColor?: ColorPropertyTheme | ColorProperty;
  size?: 'small' | 'medium' | 'large';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
};
