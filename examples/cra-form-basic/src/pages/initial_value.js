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
      firstName: "Olivier"
    }
  }
  const { Form, setValue, rule } = useForm(doSubmit, options);

  rule(name => {
    if (name === '') {
      setValue(name, 'Franki');
    }
  })

  return (
    <>
      <Form>
        <div>
          {/* 
            No default value or initial value are set for the field "name".
            The first value will be an empty string but will be replaced by "Franki" due to the presence of the above rule 
          */}
          <div><b>Name: </b><Input name="name" /></div>
          
          {/* 
            There is a default value but since a initial value has been specified for the field firstName,
            the initial content of this field will be Olivier and not "none"
          */}
          <div><b>Firstname: </b><Input name="firstName" defaultValue="none" /></div>

          {/* 
            Since there is not initialValue, the defaultValue is applied and the initial value will be "male"
          */}
          <div>
            <Select name="gender" defaultValue="male">
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
