import { Property } from 'csstype';
import { ReactNode } from 'react';
import { ColorPropertyTheme, SpacingPropertyTheme, TLength } from '../../styles/typings';

export type TagProps = {
  kind?: ColorPropertyTheme;
  bgColor?: ColorPropertyTheme | Property.BackgroundColor;
  fontColor?: ColorPropertyTheme | Property.Color;
  size?: 'small' | 'medium' | 'large';
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  marginLeft?: SpacingPropertyTheme | Property.Margin<TLength>;
  marginRight?: SpacingPropertyTheme | Property.Margin<TLength>;
  marginTop?: SpacingPropertyTheme | Property.Margin<TLength>;
  marginBottom?: SpacingPropertyTheme | Property.Margin<TLength>;
  icon?: ReactNode;
};
