import { useValue } from './index';
import { useFormContext } from './context';

export const useField = (name, validators = [], options = {}) => {
  const { init } = useFormContext();
  const field = init(name, validators, options);
  field.value = useValue(name);
  // const [value, setValue] = useState(
  //   get(
  //     values,
  //     name,
  //     options.defaultValue === undefined ? '' : options.defaultValue
  //   )
  // );
  // const [validation, setValidation] = useState(
  //   get(validations, name, defaultValidation)
  // );
  // field.value = value;
  // field.validation = validation;

  // useEffect(() => {
  //   const listener = function (field) {
  //     //setImmediate(() => setValue(value));
  //     setValue(field.value);
  //     setValidation(field.validation);
  //   };
  //   onFieldChange(listener, [name]);
  //   return () => {
  //     offFieldChange(listener, [name]);
  //   };
  //   // eslint-disable-next-line
  // }, []);

  return field;
};
