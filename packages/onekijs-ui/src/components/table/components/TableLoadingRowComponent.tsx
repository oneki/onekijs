import React from 'react';
import styled, { css } from 'styled-components';
import { minHeight, width } from '../../../styles/size';
import { ComponentStyle } from '../../../styles/typings';
import LoadingItem from '../../list/components/LoadingItem';

const TableLoadingRowComponent: React.FC<React.InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return <LoadingItem {...props} />;
};

const style: ComponentStyle<React.InputHTMLAttributes<HTMLDivElement>> = ({ theme }) => {
  const t = theme.table;
  return css`
    ${minHeight(t.loadingRowMinHeight)}
    ${width('full')}
  `;
};

export default styled(TableLoadingRowComponent)`
  ${style}
`;
