import { Tabs, Tab, ComponentStyle, width, DateTimePicker, DatePicker, DateRangePicker, DateTimeRangePicker, DateRange, defaultQuickRanges, useQuickRanges, DateRangeAdapter, dateToString, useDateRangeAdapter, marginTop, useTimestampRangeAdapter } from 'onekijs-ui';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const datetimeStyle: ComponentStyle<{}> = () => {
  return css`
    ${width('400px')}
    .o-result {
      ${marginTop('400px')}
    }
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const qr = useQuickRanges('all');
  const adapter = useDateRangeAdapter();
  const [value, setValue] = useState(adapter.fromDateRange(qr['Last week']));
  return (
    <>
      <div className={className}>
        <DateTimeRangePicker displaySeconds={false} nullable={true} onChange={(v) => setValue(v)} value={value} quickRanges={qr} adapter={adapter} />
        <div className="o-result">
          <pre>{JSON.stringify(value, undefined, 2)}</pre>
        </div>
        <button onClick={() => setValue(adapter.fromDateRange(qr['Last month']))}>Set last month</button>
      </div>

    </>
  );
};

export const DatetimePage = styled(Page)`
  ${datetimeStyle}
`;
