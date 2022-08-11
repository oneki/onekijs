import { WidthProperty } from 'csstype';
import { AnonymousObject } from 'onekijs-framework';
import { css } from 'styled-components';
import { alignItems } from '../../styles/alignment';
import { display } from '../../styles/display';
import { flexDirection, flexWrap } from '../../styles/flex';
import { boxSizing } from '../../styles/interactivity';
import { width } from '../../styles/size';
import { marginBottom, marginLeft, marginRight, marginTop, marginX, marginY } from '../../styles/spacing';
import { ComponentStyle, Theme, TLength } from '../../styles/typings';
import { ColProps, RowProps } from './typings';

const getColWidths = (gap: WidthProperty<TLength>, theme: Theme) => {
  const getContent = (size: number, variant?: 'sm' | 'md' | 'lg' | 'xl'): string => {
    const content = `{ flex: 0 0 calc((100% / 12) * ${size}  - ${gap}); max-width: calc((100% / 12) * ${size}  - ${gap}); }`;
    if (variant) {
      const breakpoint = theme.breakpoints[variant];
      return `@media (min-width: ${breakpoint}) { .o-col-${variant}-${size} ${content} }`;
    } else {
      return `.o-col-${size} ${content}`;
    }
  };
  const colWidths: string[] = [];
  ([undefined, 'sm', 'md', 'lg', 'xl'] as any).forEach((variant?: 'sm' | 'md' | 'lg' | 'xl') => {
    for (let i = 1; i <= 12; i++) {
      colWidths.push(getContent(i, variant));
    }
  });
  return colWidths.join(' ');
};

const formatSize = (value: TLength | undefined, defaultValue: string): string => {
  return value === undefined ? defaultValue : value === 0 ? '0px' : value;
};

export const rowStyle: ComponentStyle<RowProps> = ({
  alignItems: align = 'stretch',
  width: w = '100%',
  sm,
  md,
  lg,
  xl,
  gap,
  gapX,
  gapY,
  marginTop: mt,
  marginBottom: mb,
  marginRight: mr,
  marginLeft: ml,
  marginX: mx,
  marginY: my,
  margin: m,
  reverse = false,
}) => {
  const gapStr = formatSize(gap, '0px');
  const gapXStr = formatSize(gapX, gapStr);
  const gapYStr = formatSize(gapY, gapStr);
  const marginStr = formatSize(m, '0px');
  const marginXStr = formatSize(mx, marginStr);
  const marginYStr = formatSize(my, marginStr);
  const marginTopStr = formatSize(mt, marginYStr);
  const marginBottomStr = formatSize(mb, marginYStr);
  const marginRightStr = formatSize(mr, marginXStr);
  const marginLeftStr = formatSize(ml, marginXStr);
  const variantWidth: AnonymousObject = {};
  if (sm !== undefined) variantWidth.sm = sm;
  if (md !== undefined) variantWidth.md = md;
  if (lg !== undefined) variantWidth.lg = lg;
  if (xl !== undefined) variantWidth.xl = xl;
  return css`
    ${display('flex')}
    ${flexWrap('wrap')}
    ${alignItems(align)}
    ${boxSizing('border-box')}
    ${flexDirection(reverse ? 'row-reverse' : 'row')}
    ${width(w, variantWidth)}
    ${marginLeft(`calc(${marginLeftStr} - ${gapXStr}/2)`)}
    ${marginRight(`calc(${marginRightStr} - ${gapXStr}/2)`)}
    ${marginTop(`calc(${marginTopStr} - ${gapYStr}/2)`)}
    ${marginBottom(`calc(${marginBottomStr} - ${gapYStr}/2)`)}
    .o-col {
      ${marginX(`calc(${gapXStr}/2)`)}
      ${marginY(`calc(${gapYStr}/2)`)}
    }
    ${(props) => getColWidths(gapXStr, props.theme)}
  `;
};

export const colStyle: ComponentStyle<ColProps> = () => {
  return css``;
};
