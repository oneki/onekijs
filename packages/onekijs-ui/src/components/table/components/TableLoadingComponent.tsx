import React from 'react';
import styled from 'styled-components';
import LoadingIcon from '../../icon/LoadingIcon';

const TableLoadingComponent: React.FC = (props) => {
  return (
    <div {...props}>
      <LoadingIcon width="50px" height="50px" />
    </div>
  );
};

export default styled(TableLoadingComponent)`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
