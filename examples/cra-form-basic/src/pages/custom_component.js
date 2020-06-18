import { Input, useForm, useValidation, useField } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';



const Firstname = React.memo(props => {
  // useValidation return the validation object related to the field
  const validation = useValidation(props.name);
  return (
    <div>
      <b>Firstname: </b>
      <Input
        {...props}
        required
        regex="^[a-zA-Z0-9\-_]*$"
        regexMessage="Can only contains alphanumeric characters, dashes or underscores"
      />
      {validation.status} : {validation.message}
    </div>
  );
});

const Lastname = React.memo(props => {
  // useField register the field in the form object. It returns an object containing
  //   - name: the name of the field
  //   - value: the value of th field
  //   - onChange: the onChange method to call when the value is changed
  //   - onBlur: the onBlur method to call when the field is blurred
  const { field } = useField(props.name);
  return (
    <div>
      <b>Lastname: </b>
      <input {...props} {...field} />
    </div>
  );
});

export const CustomComponentPage = () => {
  const [result, setResult] = useState();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  // useForm should be used anytime a new form is needed.
  // Never pass any props of useForm to nested components. A nested component should always use useFormContext
  // to get these props (for performance reasons)
  const { Form, field } = useForm(doSubmit);

  return (
    <>
      {/* 
        The Form component acts as a FormContext.Provider and handle the submit action
      */}
      <Form>
        <div>
          {/* 
            Full custom component, do not rely on an Oneki wrapper
          */}
          <Lastname name="lastname" />
          {/* 
            Custom component on top of Input wrapper. It handles the layout and validation and force some validators
          */}
          <Firstname name="firstName" />

          <div>
            <b>Gender: </b>
            {/* 
              You can combine custom components with core react components
            */}
            <select {...field('gender', [], { defaultValue: 'male'})}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* 
            The submit button will trigger the method passed as first argument to useForm 
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
