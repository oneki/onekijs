import { Tabs, Tab, ComponentStyle, width, DateTimePicker, DatePicker, DateRangePicker, DateTimeRangePicker } from 'onekijs-ui';
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
      <DateTimeRangePicker />
    </div>
  );
};

export const DatetimePage = styled(Page)`
  ${datetimeStyle}
`;
