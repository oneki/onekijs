import { Input, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';

export const ArrayPage = () => {
  const [result, setResult] = useState();

  const submit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  const { Form, getValue, getValidation, add, remove, values } = useForm(submit);
  console.log(values);

  return (
    <>
      <Form>
        <div>
          <div>
            <b>Name: </b>
            <Input name="lastname" required />
          </div>
          <div>
            <b>Firstname: </b>
            <Input name="firstname" required />
          </div>

          <div>
            <b>Addresses: </b>
            <table border="1">
              <thead>
                <tr>
                  <th></th>
                  <th>Street</th>
                  <th>Postal Code</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {getValue('addresses', []).map((a, i) => (
                  <tr key={`address.${i}`}>
                    <td onClick={() => remove('addresses', i)} style={{cursor: 'pointer'}}>&#8722;</td>
                    <td>
                      <Input name={`addresses.${i}.street`} required />
                      <br />
                      <span>{getValidation(`addresses.${i}.street`).message}</span>
                    </td>
                    <td>
                      <Input name={`addresses.${i}.postalCode`} />
                    </td>
                    <td>
                      <Input name={`addresses.${i}.city`} />
                    </td>
                  </tr>
                ))}
                <tr colSpan="3">
                  <td onClick={() => add('addresses')} style={{cursor: 'pointer'}}>&#43;</td>
                </tr>
              </tbody>
            </table>
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
