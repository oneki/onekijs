import { AlignItemsProperty, WidthProperty } from 'csstype';
import { TLength } from '../../styles/typings';

export type RowProps = Omit<React.InputHTMLAttributes<HTMLDivElement>, 'width'> & {
  alignItems?: AlignItemsProperty;
  gap?: WidthProperty<TLength>;
  width?: WidthProperty<TLength>;
  sm?: WidthProperty<TLength>;
  md?: WidthProperty<TLength>;
  lg?: WidthProperty<TLength>;
  xl?: WidthProperty<TLength>;
  reverse?: boolean;
};

export type ColProps = Omit<React.InputHTMLAttributes<HTMLDivElement>, 'size'> & {
  size: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  offset?: GridSize;
};

export type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
