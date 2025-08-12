import { Tabs, Tab, ComponentStyle, width, DateTimePicker, DatePicker, DateRangePicker, DateTimeRangePicker, DateRange } from 'onekijs-ui';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const datetimeStyle: ComponentStyle<{}> = () => {
  return css`
    ${width('400px')}
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const [value, setValue] = useState<DateRange | null>(null);
  return (
    <>
      <div className={className}>
        <DateTimeRangePicker displaySeconds={false} nullable={true} onChange={(v) => setValue(v)} value={value} quickRanges={['Last hour', 'Last day', 'Last week', 'Last month', 'Last year']} />
      </div>
      <div>
        <pre>{JSON.stringify(value)}</pre>
      </div>
    </>
  );
};

export const DatetimePage = styled(Page)`
  ${datetimeStyle}
`;
