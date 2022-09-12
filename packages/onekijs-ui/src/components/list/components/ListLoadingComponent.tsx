import React from 'react';
import styled from 'styled-components';
import { StylableProps } from '../../../styles/typings';
import { addClassname } from '../../../utils/style';
import LoadingIcon from '../../icon/LoadingIcon';

const ListLoadingComponent: React.FC<StylableProps> = ({ className }) => {
  return (
    <div className={addClassname('o-list-loading', className)}>
      <LoadingIcon width="50px" height="50px" />
    </div>
  );
};

export default styled(ListLoadingComponent)`
  height: 100%;
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
