import { ParsedQuery } from '../types/router';
import useTryLocation from './useTryLocation';

// change the state every time it changes
const useTryQuery = (): ParsedQuery<string> | undefined => {
  const location = useTryLocation();
  return location?.query;
};

export default useTryQuery;
