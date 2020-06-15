import { Input, Select, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';

/**
 * This example explains how to use the Form component.
 */
export const BasicPage = () => {
  const [result, setResult] = useState();

  const submit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form } = useForm(submit);

  return (
    <>
      <Form>
        <div>
          <div><b>Name: </b><Input name="lastname" /></div>
          <div><b>Firstname: </b><Input name="firstname" /></div>
          <div><b>Gender: </b>
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
