import React, { SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import { FCC } from '../types/core';
import { AnonymousObject } from '../types/object';
import { get, omit, pick } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import {
  FormConfig,
  FormListenerType,
  FormProps,
  FormSubmitListener,
  FormValidationListener,
  FormValueListener,
} from './typings';
import useForm, { FormContext } from './useForm';

const configKeys: (keyof FormConfig)[] = [
  'touchOn',
  'onError',
  'onSubmit',
  'onWarning',
  'labelWidth',
  'xsLabelWidth',
  'smLabelWidth',
  'mdLabelWidth',
  'lgLabelWidth',
  'xlLabelWidth',
  'layout',
  'fieldSize',
];

const FormComponent: FCC<React.FormHTMLAttributes<HTMLFormElement>> = (props) => {
  const service = useForm();
  useEffect(() => {
    service.onMount();
  }, [service]);
  return <form {...props} />;
};

const Form: FCC<FormProps> = (props) => {
  const prevValuesRef = useRef({});
  const prevValidationsRef = useRef<AnonymousObject<FieldValidation>>({});
  const prevSubmittingRef = useRef(false);

  const { controller, className, LoadingComponent, onSubmit, ..._props } = props;
  const config = pick<FormConfig>(props, configKeys);
  controller.config = config;

  const formProps = omit<React.FormHTMLAttributes<HTMLFormElement>>(_props, configKeys);

  const submit = useCallback(
    (e?: SyntheticEvent) => {
      if (e) {
        e.preventDefault();
      }
      controller.submit();
    },
    [controller],
  );

  // eslint-disable-next-line
  useEffect((): void => {
    for (const prop of controller.pendingDispatch) {
      for (const type of Object.keys(controller.listeners) as FormListenerType[]) {
        for (const watch of Object.keys(controller.listeners[type])) {
          if (prop === watch) {
            for (const listener of controller.listeners[type][watch]) {
              let changed = false;
              if (type === 'valueChange') {
                const prev = get(prevValuesRef.current, watch, '');
                const next = get(controller.state.values, watch, '');
                if (prev !== next) {
                  changed = true;
                  (listener.listener as FormValueListener)(next, prev, watch);
                }
              } else if (type === 'validationChange') {
                let prev: FieldValidation | ContainerValidation;
                let next: FieldValidation | ContainerValidation;
                // check if w is a field or a composition
                if (!controller.fields[watch]) {
                  prev = controller.getContainerFieldValidation(
                    prevValidationsRef.current,
                    controller.fields,
                    watch,
                    false,
                  );
                  next = controller.getContainerFieldValidation(
                    controller.state.validations || {},
                    controller.fields,
                    watch,
                    false,
                  );
                  if (prev.status !== next.status || prev.message !== next.message) {
                    changed = true;
                  }
                } else {
                  prev = prevValidationsRef.current[watch];
                  const nextValidations = controller.state.validations || {};
                  next = nextValidations[watch];
                  if (prev !== next) {
                    changed = true;
                  }
                }

                if (changed) {
                  (listener.listener as FormValidationListener)(next, prev, watch);
                }
              } else if (type === 'submittingChange') {
                changed = prevSubmittingRef.current !== controller.state.submitting;
                if (changed) {
                  (listener.listener as FormSubmitListener)(
                    controller.state.submitting || false,
                    prevSubmittingRef.current,
                  );
                }
              }

              if (changed && listener.once) {
                controller.offChange(type, listener.id);
              }
            }
          }
        }
      }
    }
    controller.pendingDispatch.clear();
    prevValuesRef.current = controller.state.values || {};
    prevValidationsRef.current = controller.state.validations || {};
    prevSubmittingRef.current = controller.state.submitting || false;
  });

  const classNames = className ? `${className} o-form` : 'o-form';

  if (controller.state.loading) {
    return LoadingComponent ? <LoadingComponent /> : null;
  }

  if (controller.state.fetching) {
    return null;
  }

  return (
    <FormContext.Provider value={controller}>
      <FormComponent {...formProps} onSubmit={submit} className={classNames} />
    </FormContext.Provider>
  );
};

export default Form;
