import { Input, Select, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';

export const WrapperPage = () => {
  const [result, setResult] = useState();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  // useForm should be used anytime a new form is needed.
  // Never pass any props of useForm to nested components. A nested component should always use useFormContext
  // to get these props (for performance reasons)
  const { Form, getValidation, reset } = useForm(doSubmit);

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
              the Input component wraps the core <input> react component
              It will automatically register the field
             */}
            <Input name="name" required />
            {getValidation('name').status} : {getValidation('name').message}
          </div>       
          <div>
            <b>Firstname: </b>
            {/* 
              The Input component accepts additional props for specifying validators
             */}
            <Input
              name="firstName"
              required
              regex="^[a-zA-Z0-9\-_]*$"
              regexMessage="Can only contains alphanumeric characters, dashes or underscores"
            />
            {/* 
              You can use the getValidation helper to get the result of the validation
             */}
            {getValidation('firstName').status} : {getValidation('firstName').message}
          </div>
          <div>
            <b>Password: </b>
            {/* 
              the Input component accepts the same props as the <input> core component
             */}
            <Input type="text" name="password" />
          </div>             
          <div>
            <b>Gender: </b>
            {/* 
              The different core react form components have their corresponding wrapper
             */}

            <Select name="gender" defaultValue="male">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </div>

          {/* 
              The submit wrapper listen on the form status and is disabled when status is not OK
             */}
          <button type="submit">Submit</button> <div onClick={reset}>Reset</div>
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
