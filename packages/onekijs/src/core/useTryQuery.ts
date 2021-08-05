import qs from 'query-string';
import useTryLocation from './useTryLocation';

// change the state every time it changes
const useTryQuery = (): qs.ParsedQuery<string> | undefined => {
  const location = useTryLocation();
  return location?.query;
};

export default useTryQuery;
