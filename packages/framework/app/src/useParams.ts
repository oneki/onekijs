import { useTryParams } from '@oneki/core';
import { AnonymousObject } from '@oneki/types';

// change the state every time it changes
const useParams = (): AnonymousObject<string> => {
  const params = useTryParams();
  // useParams is called in the context of an <App>
  // Therefore we know params is always defined
  return params as AnonymousObject<string>;
};

export default useParams;
