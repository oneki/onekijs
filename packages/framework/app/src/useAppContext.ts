import { DefaultAppContext } from '@oneki/core';
import { AppContext } from '@oneki/types';
import { useContext } from 'react';

const useAppContext = (): AppContext => {
  return useContext(DefaultAppContext);
};

export default useAppContext;
