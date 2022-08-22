import { useEffect, useRef } from 'react';
import { FormDecorator, FormDecoratorOptions } from './typings';
import useForm from './useForm';

const useFormDecorator = (name: string, options: FormDecoratorOptions = {}): FormDecorator => {
  const form = useForm();
  const decorator = form.initDecorator(name, options);
  const optionsRef = useRef<FormDecoratorOptions>(options);
  const nameRef = useRef<string>(name);

  useEffect(() => {
    if (!form.initializing) {
      if (optionsRef.current.disabled) {
        form.setMetadata(nameRef.current, 'disabled', optionsRef.current.disabled);
      }
      if (optionsRef.current.visible === false) {
        form.setMetadata(nameRef.current, 'visible', optionsRef.current.visible);
      }
    }
  }, [decorator, form]);

  return decorator;
};

export default useFormDecorator;
