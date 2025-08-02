import { ColorPropertyTheme, SizePropertyTheme, TLength } from '../../styles/typings';
import { Property } from 'csstype';

export type SliderProps = {
  anchorColor: ColorPropertyTheme | Property.BackgroundColor;
  backgroundColor: ColorPropertyTheme | Property.BackgroundColor;
  fillColor: ColorPropertyTheme | Property.BackgroundColor;
  size: 'small' | 'medium' | 'large' | 'extra_large';
  width: SizePropertyTheme | Property.Width<TLength>;
}
