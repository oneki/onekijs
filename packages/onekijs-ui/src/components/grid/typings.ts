import { Property } from 'csstype';
import { TLength } from '../../styles/typings';

export type RowProps = Omit<React.InputHTMLAttributes<HTMLDivElement>, 'width'> & {
  alignItems?: Property.AlignItems;
  gap?: Property.Width<TLength>;
  gapX?: Property.Width<TLength>;
  gapY?: Property.Height<TLength>;
  width?: Property.Width<TLength>;
  xs?: Property.Width<TLength>;
  sm?: Property.Width<TLength>;
  md?: Property.Width<TLength>;
  lg?: Property.Width<TLength>;
  xl?: Property.Width<TLength>;
  reverse?: boolean;
  marginLeft?: Property.Margin<TLength>;
  marginRight?: Property.Margin<TLength>;
  marginX?: Property.Margin<TLength>;
  marginTop?: Property.Margin<TLength>;
  marginBottom?: Property.Margin<TLength>;
  marginY?: Property.Margin<TLength>;
  margin?: Property.Margin<TLength>;
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
