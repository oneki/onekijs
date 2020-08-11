import { Input, Select, useForm, useBind, useValue, useAsyncBind } from 'onekijs';
import React, { useCallback, useState, FC } from 'react';

const States: FC<{states: string[]|undefined, loading: boolean}> = React.memo(({states, loading}) => {
  const showState = useBind((country: string) => country === 'usa', [useValue('country')])
  if (showState) {
    return (
      <div>
        <b>State: </b>
        <Select name="state">
          {!loading && states &&
            states.map(state => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
        </Select>
      </div>
    )
  }
  return null;
});

export const BindPage = () => {
  const [result, setResult] = useState<string>();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  // useForm should be used anytime a new form is needed.
  // Never pass any props of useForm to nested components. A nested component should always use useFormContext
  // to get these props (for performance reasons)
  const { Form, getValidation, values } = useForm(doSubmit);

  // Simulate retrieving the state from the server
  // During the loading, the asyncBind will return [undefined, true]
  // Once the async function will be resolved, the asyncBind will force a rerender and returns [stateList, false]
  const [states, statesLoading] = useAsyncBind(
    async (country: string) => {
      console.log("useAsyncBind", country);
      // simulate a delay
      await new Promise(r => setTimeout(r, 100));
      if (country === 'usa') {
        return [
          'Alabama',
          'Alaska',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'DistrictofColumbia',
          'Florida',
          'Georgia',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Montana',
          'Nebraska',
          'Nevada',
          'NewHampshire',
          'NewJersey',
          'NewMexico',
          'NewYork',
          'NorthCarolina',
          'NorthDakota',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Pennsylvania',
          'RhodeIsland',
          'SouthCarolina',
          'SouthDakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virginia',
          'Washington',
          'WestVirginia',
          'Wisconsin',
          'Wyoming',
        ];
      } else {
        return [];
      }
    },
    [values?.country]
  );
    console.log(states, statesLoading);
  return (
    <>
      {/* 
        The Form component acts as a FormContext.Provider and handles the submit action
        */}
      <Form>
        <div>
          <div>
            <b>Name: </b>
            <Input name="name" />{' '}
          </div>

          <div>
            <b>Firstname: </b>
            <Input
              name="firstName"
              required
              regex="^[a-zA-Z0-9\-_]*$"
              regexMessage="Can only contains alphanumeric characters, dashes or underscores"
            />
            {getValidation('firstName').status} :{' '}
            {getValidation('firstName').message}
          </div>

          <div>
            <b>Country: </b>
            <Select name="country" defaultValue="belgium">
              <option value="belgium">Belgium</option>
              <option value="usa">United States of America</option>
            </Select>
          </div>

          <States states={states} loading={statesLoading} />

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
