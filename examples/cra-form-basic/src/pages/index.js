import { email, Input, required, useForm, useAsyncBind } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';

async function testAsync(email) {
  await new Promise(r => setTimeout(r, 1000));
  if (email === 'olivier.franki@gmail.com') {
    throw Error('fake');
  }
  return email;
}

const Email = React.memo(() => {
  return (
    <div>
      <b>Email: </b>
      <Input name="email" validators={[email('Invalid email')]} />
    </div>
  );
});

export const IndexPage = () => {
  const [result, setResult] = useState();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form, field, validation, asyncBind } = useForm(doSubmit);

  const [asyncResult, loading, error] = asyncBind(testAsync, ['email']);

  if (result) {
    return (
      <>
        <pre>{result}</pre>
        <br />
        <button onClick={() => setResult(null)}>Back</button>
      </>
    );
  }
  return (
    <>
      {/* 
        The Form component acts a FormContex.Provider and handle the submit action
        */}
      <Form>
        <div>
          <div>
            <b>Name: </b>
            {/* 
              you can register a field by using the field method helper coming from useForm
              This solution is quite inefficient as the field will be rerendered for any 
              modification of the form
             */}
            <input {...field('name', [required()])} />
            {validation('name').status} : {validation('name').message}
          </div>
          <div>
            <b>Firstname: </b>
            {/* 
              Input a a little wrapper of the default <input> react component to auto register the field
              It's more efficient since it is only rerendered when its own value is changed.
              It's also more convenient for definig core validators.
             */}
            <Input
              name="firstName"
              required
              regex="^[a-zA-Z0-9\-_]*$"
              regexMessage="Can only contains alphanumeric characters, dashes or underscores"
            />
          </div>
          {/* 
              You can define your own component on top of Input to add layout or custom props
             */}
          <Email name="email" required />

          {/* 
              The submit button will trigger the method passed as argument to useForm 
             */}
          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
};
