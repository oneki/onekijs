import { Tabs, Tab, ComponentStyle, DatePicker, width } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const datetimeStyle: ComponentStyle<{}> = () => {
  return css`
    ${width('300px')}
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <DatePicker />
    </div>
  );
};

export const DatetimePage = styled(Page)`
  ${datetimeStyle}
`;
