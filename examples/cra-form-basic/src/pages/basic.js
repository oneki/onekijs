import { regex, required, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';

/**
 * This example explains how to use the core form component of React with OnekiJS forms.
 * For better performance, it's recommended to use the OnekiJS wrappers => see wrapper.js example
 */
export const BasicPage = () => {
  const [result, setResult] = useState();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form, field, validation } = useForm(doSubmit);


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
            <input {...field('name')} />
          </div>
          <div>
            <b>Firstname: </b>
            {/* 
              You can spcecify some validators when registering the field
             */}
            <input {...field('firstName', [
              required(), 
              regex("^[a-zA-Z0-9\-_]*$", "Can only contains alphanumeric characters, dashes or underscores")
            ])} /> 
            {/* 
              You can use the validation helper to get the result of the validation
             */}            
            {validation('firstName').status} : {validation('firstName').message}
          </div>
          <div>
            <b>Gender: </b>
            {/* 
              You can use the third argument (options) to specify a default value
             */}
            
            <select {...field('gender', [], { defaultValue: 'male'})}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>   
          </div>         

          {/* 
              The submit button will trigger the method passed as argument to useForm 
             */}
          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
};
