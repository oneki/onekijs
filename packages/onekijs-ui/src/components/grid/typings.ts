import { AlignItemsProperty, HeightProperty, MarginProperty, WidthProperty } from 'csstype';
import { TLength } from '../../styles/typings';

export type RowProps = Omit<React.InputHTMLAttributes<HTMLDivElement>, 'width'> & {
  alignItems?: AlignItemsProperty;
  gap?: WidthProperty<TLength>;
  gapX?: WidthProperty<TLength>;
  gapY?: HeightProperty<TLength>;
  width?: WidthProperty<TLength>;
  xs?: WidthProperty<TLength>;
  sm?: WidthProperty<TLength>;
  md?: WidthProperty<TLength>;
  lg?: WidthProperty<TLength>;
  xl?: WidthProperty<TLength>;
  reverse?: boolean;
  marginLeft?: MarginProperty<TLength>;
  marginRight?: MarginProperty<TLength>;
  marginX?: MarginProperty<TLength>;
  marginTop?: MarginProperty<TLength>;
  marginBottom?: MarginProperty<TLength>;
  marginY?: MarginProperty<TLength>;
  margin?: MarginProperty<TLength>;
};

export type ColProps = Omit<React.InputHTMLAttributes<HTMLDivElement>, 'size'> & {
  size: GridSize;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  offset?: GridSize;
};

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
