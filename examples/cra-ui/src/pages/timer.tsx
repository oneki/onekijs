import { Timer, ComponentStyle, paddingY, display, justifyContent } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const timerStyle: ComponentStyle<{}> = () => {
  return css`
    ${paddingY('2xl')}
    ${display('flex')}
    ${justifyContent('center')}
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={className}>
      <Timer timeMs={5000} />
    </div>;
};

export const TimerPage = styled(Page)`
  ${timerStyle}
`;
