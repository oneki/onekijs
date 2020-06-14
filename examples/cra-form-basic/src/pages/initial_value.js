import { Input, Select, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';



export const InitialValuePage = () => {
  const [result, setResult] = useState();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  // useForm should be used anytime a new form is needed.
  // You can pass initialValue to the Form. Useful for a form of type "edit"
  const options = {
    initialValues: {
      firstName: "Olivier",
      name: "Franki",
      gender: "male"
    }
  }
  const { Form, validation } = useForm(doSubmit, options);

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
              the Input component wraps the core <input> react component and accepts the same props
              It will automatically register the field
              
             */}
            <Input name="name" />
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
              You can use the validation helper to get the result of the validation
             */}            
            {validation('firstName').status} : {validation('firstName').message}            
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
              The submit button will trigger the method passed as argument to useForm 
             */}
          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
};
