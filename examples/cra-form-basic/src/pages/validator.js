import { required, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';


const maxlength = (maxlength, message) => {
  return value => {
    let valid;
    if (value === null || value === undefined) {
      valid = true;
    } else if (Array.isArray(value) || typeof value === 'string') {
      valid = value.length <= maxlength;
    } else {
      throw Error(`Invalid type ${typeof value} for maxlength validator`)
    }

    if (!message) {
      message = `Cannot exceed ${maxlength} ${typeof value == 'string' ? 'characters' : 'items'}`;
    }

    return {
      valid,
      message,
    };
  }
}

/**
 * This example explains how to use a core validator and a custom reusable and a inline validator
 */
export const ValidatorPage = () => {
  const [result, setResult] = useState();

  const submit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form, getValidation, field } = useForm(submit);

  return (
    <>
      <Form>
        <div>
          <div>
            <b>Lastname: </b>
            <input {...field('lastname', [
              required(), 
              maxlength(5),
              value => {
                return {
                  valid: value !== 'foo',
                  message: 'Cannot be equals to foo'
                }
              }
            ])} />
            {getValidation('lastname').status} : {getValidation('lastname').message}
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
