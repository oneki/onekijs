import React from 'react';
import styled, { css } from 'styled-components';
import { minHeight, width } from '../../../styles/size';
import { ComponentStyle } from '../../../styles/typings';
import LoadingItem from '../../list/components/LoadingItem';
import { TableBodyRowProps } from '../typings';
import { useTableConfig } from '../hooks/useTableConfig';

const TableLoadingRowComponent: React.FC<TableBodyRowProps>= (props) => {
  const { itemHeight } = useTableConfig();
  const minHeight = typeof itemHeight === 'function' ? itemHeight(props.index) : itemHeight
  return <LoadingItem {...props} minHeight={minHeight} />;
};

const style: ComponentStyle<TableBodyRowProps> = ({ theme }) => {
  const t = theme.table;
  return css`
    ${minHeight(t.loadingRowMinHeight)}
    ${width('full')}
  `;
};

export default styled(TableLoadingRowComponent)`
  ${style}
`;
