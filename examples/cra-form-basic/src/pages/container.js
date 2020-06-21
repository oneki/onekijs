import { Input, Select, useForm, FormContext, useFieldContainer } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';


// useFieldContainer acts as a transparent proxy between the form and the fields inside the container
// it returns the context to pass to the fields, the value of the container and a validation object which is
// the result of the compilation of all inside field validations
export const MyContainer = (props) => {
  const { context, value, validation } = useFieldContainer();
  return (
    <FormContext.Provider value={context}>
      <div {...props}/>
      <div>Status of the container: {validation.status}</div>
      <div>Value of the container: <pre>{JSON.stringify(value)}</pre></div>
    </FormContext.Provider>
  )
}


export const ContainerPage = () => {
  const [result, setResult] = useState();

  const submit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form } = useForm(submit);

  return (
    <>
      <Form>
        <div>
          <MyContainer>
            <div>
              <b>Name: </b>
              <Input name="lastname" required />
            </div>
            <div>
              <b>Firstname: </b>
              <Input name="firstname" required />
            </div>
          </MyContainer>
          <div>
            <b>Gender: </b>
            <Select name="gender">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </div>
          <button type="submit">Submit</button>
        </div>
      </Form>

      {result && (
        <div>
          <h2>Result</h2>
          <pre>{result}</pre>
        </div>
      )}
    </>
  );
};
