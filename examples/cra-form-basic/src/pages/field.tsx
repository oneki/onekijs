import { regex, required, useForm } from 'onekijs';
import React, { useCallback, useState } from 'react';

/**
 * This example explains how to use the core form component of React with OnekiJS forms.
 * For better performance, it's recommended to use the OnekiJS wrappers => see wrapper.js example
 */
export const FieldPage = () => {
  const [result, setResult] = useState<string>();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form, field, getValidation } = useForm(doSubmit);

  return (
    <>
      {/* 
        The Form component acts as a FormContext.Provider and handle the submit action
        */}
      <Form>
        <div>
          <div>
            <b>Name: </b>
            {/* 
              you can register a field by using the field method helper coming from useForm
             */}
            <input {...field('name')} />
          </div>
          <div>
            <b>Firstname: </b>
            {/* 
              You can specify some validators when registering the field
             */}
            <input {...field('firstName', [
              required(), 
              regex("^[a-zA-Z0-9\-_]*$", "Can only contains alphanumeric characters, dashes or underscores")
            ])} /> 
            {/* 
              You can use the getValidation helper to get the result of the validation
             */}            
            {getValidation('firstName').status} : {getValidation('firstName').message}
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
      {result && (
        <div>
          <h2>Result</h2>     
          <pre>{result}</pre>
        </div>
      )}      
    </>
  );
};
