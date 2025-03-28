import { Input, required, useForm, useValidation, InputProps } from 'onekijs';
import React, { useCallback, useState, FC } from 'react';
/**
 * This example explains how to use a core validator and a custom reusable and a inline validator
 */

// custom validator
const maxlength = (maxlength: number, message?: string) => {
  return (value: any) => {
    let valid;
    if (value === null || value === undefined) {
      valid = true;
    } else if (Array.isArray(value) || typeof value === 'string') {
      valid = value.length <= maxlength;
    } else {
      throw Error(`Invalid type ${typeof value} for maxlength validator`);
    }

    if (!message) {
      message = `Cannot exceed ${maxlength} ${
        typeof value == 'string' ? 'characters' : 'items'
      }`;
    }

    return {
      valid,
      message,
    };
  };
};

// custom component using this validator
const MaxlengthInput: FC<InputProps & { maxlength?: number, maxlengthMessage?: string}> = props => {
  const {
    maxlength: maxlengthValue,
    maxlengthMessage,
    validators = [],
    ...fieldProps
  } = props;

  if (maxlengthValue !== undefined) {
    validators.push(maxlength(maxlengthValue, maxlengthMessage || ''));
  }

  const validation = useValidation(props.name);
  
  return (
    <>
      <Input validators={validators} {...fieldProps} />
      {validation.status} : {validation.message}
    </>
  );
};

export const ValidatorPage = () => {
  const [result, setResult] = useState<string>();

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
            <input
              {...field('lastname', [
                required(),    // core validator
                maxlength(5),  // custom reusable validator
                value => {     // inline validator
                  return {
                    valid: value !== 'foo',
                    message: 'Cannot be equals to foo',
                  };
                },
              ])}
            />
            {getValidation('lastname').status} :{' '}
            {getValidation('lastname').message}
          </div>
          <div>
            <b>Firstname: </b>{' '}
            <MaxlengthInput name="firstName" required maxlength={5} />
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
