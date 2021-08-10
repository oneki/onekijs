import useTryLocation from '../core/useTryLocation';
import { Location } from '../types/router';

// change the state every time it changes
const useLocation = (): Location => {
  const location = useTryLocation();
  // useLocation is called in the context of an <App>
  // Therefore we know location is always defined
  return location as Location;
};

export default useLocation;
