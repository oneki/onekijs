import React, { FC, memo } from 'react';
import Select from '../../components/Select';
import useBind from '../../useBind';
import useValue from '../../useValue';

export const usStates = [
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

const States: FC<{ states: string[] | undefined; loading: boolean }> = memo(({ states, loading }) => {
  const showState = useBind((country: string) => country === 'usa', [useValue('country')]);
  if (showState) {
    return (
      <div>
        <label htmlFor="state">state</label>
        <Select name="state" id="state">
          {!loading &&
            states &&
            states.map((state) => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
        </Select>
      </div>
    );
  }
  return null;
});

States.displayName = 'States';

export default States;
