import React, { FC } from 'react';
import { useForm, Input, InputProps } from 'onekijs';

const FirstnameInput: FC<InputProps> = () => {
  return <Input name="firstname" />;
};

export const UserForm = () => {
  const { Form } = useForm((data) => {
    console.log(data);
  });

  return (
    <Form>
      Firstname: <FirstnameInput name="firstname" />
    </Form>
  );
};
