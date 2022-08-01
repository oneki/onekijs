import { FCC } from 'onekijs-framework';
import React from 'react';
import styled from 'styled-components';
import { rowStyle } from './style';
import { RowProps } from './typings';

const RowComponent: FCC<RowProps> = ({ alignItems, width, sm, md, lg, xl, gap, ...props }) => {
  return <div {...props}></div>;
};

const Row = styled(RowComponent)`
  ${rowStyle}
`;

export default Row;
