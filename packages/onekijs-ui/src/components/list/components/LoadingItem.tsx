import React from 'react';
import styled from 'styled-components';
import { height, minHeight, width } from '../../../styles/size';
import { marginY } from '../../../styles/spacing';
import { addClassname } from '../../../utils/style';
import { backgroundColor } from '../../../styles/background';

const LoadingItem: React.FC<{ className?: string, minHeight?: number }> = ({ className }) => {
  return <div className={addClassname('o-loading-item', className)} />;
};

export default styled(LoadingItem)`
  ${height('full')}
  ${width('full')}
  ${(props) => {
    return minHeight(`${props.minHeight ?? 37}px`)
  }}
  ${marginY('1px')}
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      ${backgroundColor('lightest')};
    }
    100% {
      ${backgroundColor('light')};
    }
  }
`;
