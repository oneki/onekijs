import { Input, Select, useForm } from 'onekijs-cra';
import React, { useCallback, useState } from 'react';

export const BindPage = () => {
  const [result, setResult] = useState();

  const doSubmit = useCallback(data => {
    setResult(JSON.stringify(data, null, 2));
  }, []);

  // useForm should be used anytime a new form is needed.
  // Never pass any props of useForm to nested components. A nested component should always use useFormContext
  // to get these props (for performance reasons)
  const { Form, validation, bind, asyncBind } = useForm(doSubmit);

  // Hide the state field if country is not USA
  const showState = bind(country => country === 'usa', ['country'])

  // Simulate retrieve the state from the server
  // During the loading, the asyncBind will return [undefined, true]
  // Once the async function will be resolved, the asyncBind will force a rerender and returns [stateList, false]
  const [states, statesLoading] = asyncBind(
    async function(country) {
      // simulate a delay
      await new Promise(r => setTimeout(r, 100));
      if (country === 'usa') {
        return ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","DistrictofColumbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Montana","Nebraska","Nevada","NewHampshire","NewJersey","NewMexico","NewYork","NorthCarolina","NorthDakota","Ohio","Oklahoma","Oregon","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Pennsylvania","RhodeIsland","SouthCarolina","SouthDakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","WestVirginia","Wisconsin","Wyoming"];
      } else {
        return []
      }
    },
    ['country']
  );

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
          <div><b>Name: </b><Input name="name" /> </div>
          
          <div><b>Firstname: </b>
            <Input
              name="firstName"
              required
              regex="^[a-zA-Z0-9\-_]*$"
              regexMessage="Can only contains alphanumeric characters, dashes or underscores"
            />         
            {validation('firstName').status} : {validation('firstName').message}            
          </div>
          
          <div>
            <b>Country: </b>
            <Select name="country" defaultValue="belgium">
              <option value="belgium">Belgium</option>
              <option value="usa">United States of America</option>
            </Select>   
          </div>

          <div style={{display: showState ? 'block' : 'none'}}>
            <b>State: </b>
            <Select name="state">
              {!statesLoading && states.map(state => <option value={state} key={state}>{state}</option>)}
            </Select>   
          </div>          
          
          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
};
