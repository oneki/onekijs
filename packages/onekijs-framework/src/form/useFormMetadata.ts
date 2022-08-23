import { useEffect, useId, useRef, useState } from 'react';
import { FormMetadata, FormMetadataListener } from './typings';
import useForm from './useForm';

const useFormMetadata = (fieldName: string): FormMetadata => {
  const form = useForm();
  const id = useId();
  const nameRef = useRef(fieldName);
  const [metadata, setMetadata] = useState<FormMetadata>(form.state.metadata[fieldName] || {});

  useEffect((): (() => void) => {
    const watch = [nameRef.current || ''];
    const listener: FormMetadataListener = (metadata) => setMetadata(metadata);
    form.onMetadataChange(id, listener, watch);

    return (): void => {
      form.offMetadataChange(id);
    };
  }, [form, id]);

  return metadata;
};

export default useFormMetadata;
