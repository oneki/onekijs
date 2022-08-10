import { FCC } from 'onekijs-framework';
import React from 'react';
import styled from 'styled-components';
import { addClassname } from '../../utils/style';
import { rowStyle } from './style';
import { RowProps } from './typings';

const RowComponent: FCC<RowProps> = ({
  alignItems,
  width,
  xs,
  sm,
  md,
  lg,
  xl,
  gap,
  gapX,
  gapY,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  ...props
}) => {
  return <div {...props} className={addClassname('o-row', props.className)}></div>;
};

const Row = styled(RowComponent)`
  ${rowStyle}
`;

export default Row;
