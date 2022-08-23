import { useEffect } from 'react';
import useService from '../core/useService';
import FormService from './FormService';
import { FormOptions, FormState } from './typings';
/**
 * This callback is used when the user press the submit button
 *
 * @callback submitCallback
 * @param {Object} data - values from the form
 */
/**
 * @param {submitCallback} onSubmit - a submit callback
 * @param {Object} options
 */

const useFormController = (initialValues?: any, formOptions: FormOptions = {}): FormService => {
  // formOptions cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  const [, service] = useService(FormService, (): FormState => {
    const initialState: FormState = Object.assign({}, formOptions, {
      validations: {},
      metadata: {},
      submitting: false,
      initialValues,
    });
    if (initialValues === undefined || typeof initialValues === 'object') {
      initialState.values = initialValues;
      initialState.fetching = false;
    } else {
      initialState.values = {};
      initialState.fetching = true;
    }
    return initialState;
  });

  useEffect(() => {
    if (initialValues && typeof initialValues !== 'object') {
      service.loadInitialValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return service;
};
export default useFormController;
