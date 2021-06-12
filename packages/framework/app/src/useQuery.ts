import qs from 'query-string';
import useLocation from './useLocation';

// change the state every time it changes
const useQuery = (): qs.ParsedQuery<string> => {
  const location = useLocation();
  return location.query || {};
};

export default useQuery;
