import { AnonymousObject, Form, useFormController } from 'onekijs';
import { ComponentStyle, DateTimeRangePicker, FormDatePicker, FormDateRangePicker, FormDateTimePicker, FormDateTimeRangePicker, marginTop, SubmitButton, useDateRangeAdapter, useQuickRanges, width, WizardSummary } from 'onekijs-ui';
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
  const [formValue, setFormValue] = useState<AnonymousObject>({});
  const formController = useFormController();
  return (
    <>
      <div className={className}>
        <DateTimeRangePicker displaySeconds={false} nullable={true} onChange={(v) => setValue(v)} value={value} quickRanges={qr} adapter={adapter} />
        <div className="o-result">
          <pre>{JSON.stringify(value, undefined, 2)}</pre>
        </div>
        <button onClick={() => setValue(adapter.fromDateRange(qr['Last month']))}>Set last month</button>
      </div>
      <Form controller={formController} onSubmit={(value) => setFormValue(value)}>
        <FormDatePicker name="date" adapter="date" />
        <FormDateTimePicker name="datetime" adapter="date" displaySeconds={false} />
        <FormDateRangePicker name="dateRange" adapter="date" quickRanges={qr} />
        <FormDateTimeRangePicker name="datetimeRange" adapter="date" displaySeconds={false} quickRanges={qr} />

        <WizardSummary />

        <SubmitButton />
        <div className="o-result">
          <pre>{JSON.stringify(formValue, undefined, 2)}</pre>
        </div>
      </Form>

    </>
  );
};

export const DatetimePage = styled(Page)`
  ${datetimeStyle}
`;
