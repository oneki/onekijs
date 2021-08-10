import ContainerValidation from './ContainerValidation';
import useValidation from './useValidation';

const useFormStatus = (): ContainerValidation => {
  const result = useValidation('', false) as ContainerValidation;
  return result;
};

export default useFormStatus;
