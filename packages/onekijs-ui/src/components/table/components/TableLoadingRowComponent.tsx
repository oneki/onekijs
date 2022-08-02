import React from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor } from '../../../styles/background';
import { minHeight, width } from '../../../styles/size';
import { ComponentStyle } from '../../../styles/typings';

const TableLoadingRowComponent: React.FC<React.InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return <div {...props}></div>;
};

const style: ComponentStyle<React.InputHTMLAttributes<HTMLDivElement>> = ({ theme }) => {
  const t = theme.table;
  return css`
  ${minHeight(t.loadingRowMinHeight)}
  ${backgroundColor(t.loadingRowBgColor)}
  ${width('full')}
  `;
};

export default styled(TableLoadingRowComponent)`
  ${style}
`;
