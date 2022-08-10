import { BackgroundColorProperty, ColorProperty, MarginProperty } from 'csstype';
import { ColorPropertyTheme, SpacingPropertyTheme, TLength } from '../../styles/typings';

export type TagProps = {
  kind?: ColorPropertyTheme;
  bgColor?: ColorPropertyTheme | BackgroundColorProperty;
  fontColor?: ColorPropertyTheme | ColorProperty;
  size?: 'small' | 'medium' | 'large';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  marginLeft?: SpacingPropertyTheme | MarginProperty<TLength>;
  marginRight?: SpacingPropertyTheme | MarginProperty<TLength>;
  marginTop?: SpacingPropertyTheme | MarginProperty<TLength>;
  marginBottom?: SpacingPropertyTheme | MarginProperty<TLength>;
};
