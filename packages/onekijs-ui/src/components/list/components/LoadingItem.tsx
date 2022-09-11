import React from 'react';
import styled from 'styled-components';
import { height, minHeight, width } from '../../../styles/size';
import { marginY } from '../../../styles/spacing';
import { addClassname } from '../../../utils/style';

const LoadingItem: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={addClassname('o-loading-item', className)} />;
};

export default styled(LoadingItem)`
  ${height('full')}
  ${width('full')}
  ${minHeight('30px')}
  ${marginY('1px')}
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 95%);
    }
    100% {
      background-color: hsl(200, 20%, 80%);
    }
  }
`;
