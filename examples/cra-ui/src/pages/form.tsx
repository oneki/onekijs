import { Input, SubmitButton, useForm } from 'onekijs';
import { ComponentStyle } from 'onekijs-ui';
import React from 'react';
import styled, { css } from 'styled-components';

const fomStyle: ComponentStyle<{}> = () => {
  return css`
    input {
      border: 1px solid gray;
    }
    input.o-input-error {
      border: 1px solid red;
    }
  `;
};

const Page: React.FC<{ className?: string }> = ({ className }) => {
  const { Form, values, validations } = useForm((value) => console.log(value));

  return (
    <>
    <div>
    <Form className={className}>
      <Input name="firstname" required={true} />
      <SubmitButton />
    </Form>
    </div>
    <div>
      <pre>{JSON.stringify(values)}</pre>
    </div>
    <div>
      <pre>{JSON.stringify(validations)}</pre>
    </div>
    </>
  );
};

export const FormPage = styled(Page)`
  ${fomStyle}
`;
