import React, { FC } from 'react';
import { asyncTimeout } from '../../../__tests__/utils/timeout';
import Input from '../../components/Input';
import Select from '../../components/Select';
import useAsyncBind from '../../useAsyncBind';
import useForm from '../../useForm';
import { FormProps } from '../utils/typings';
import States, { usStates } from './States';

const UseBindWidget: FC<FormProps> = ({ submit, options }) => {
  const { Form, values } = useForm(submit, options);
  const [states, statesLoading] = useAsyncBind(
    async (country: string) => {
      await asyncTimeout(10); // simulate a delay
      if (country === 'usa') {
        return usStates; // array of all USA states
      } else {
        return [];
      }
    },
    [values?.country],
  );

  return (
    <>
      <Form>
        <div>
          <div>
            <label htmlFor="name">name</label>
            <Input name="name" id="name" />
          </div>

          <div>
            <label htmlFor="country">country</label>
            <Select name="country" id="country" defaultValue="belgium">
              <option value="belgium">Belgium</option>
              <option value="usa">United States of America</option>
            </Select>
          </div>

          <States states={states} loading={statesLoading} />

          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
};

export default UseBindWidget;
