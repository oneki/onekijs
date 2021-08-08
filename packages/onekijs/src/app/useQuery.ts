import { ParsedQuery } from '../types/router';
import useLocation from './useLocation';

// change the state every time it changes
const useQuery = (): ParsedQuery<string> => {
  const location = useLocation();
  return location.query || {};
};

export default useQuery;
