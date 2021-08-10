import useTryHistory from '../core/useTryHistory';
import { Location } from '../types/router';

// change the state every time it changes
const useHistory = (): Location[] => {
  const history = useTryHistory();
  // useHistory is called in the context of an <App>
  // Therefore we know history is always defined
  return history as Location[];
};

export default useHistory;
