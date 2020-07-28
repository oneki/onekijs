import { useContext } from 'react';
import ContainerContext from './ContainerContext';
import Container from './Container';

const useContainer = (): Container => {
  return useContext(ContainerContext);
};

export default useContainer;
