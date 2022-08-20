import React, { SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import { FCC } from '../types/core';
import { AnonymousObject } from '../types/object';
import { get, omit, pick } from '../utils/object';
import FieldValidation from './FieldValidation';
import { FormConfig, FormListenerType, FormProps } from './typings';
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
        for (const key of Object.keys(controller.listeners[type])) {
          if (prop === key) {
            for (const listener of controller.listeners[type][key]) {
              const watchs = [];
              let changed = false;
              if (type === 'valueChange') {
                listener.watchs.forEach((w: string) => {
                  const prev = get(prevValuesRef.current, w, '');
                  const next = get(controller.state.values, w, '');
                  watchs.push(next);
                  if (prev !== next) {
                    changed = true;
                  }
                });
              } else if (type === 'validationChange') {
                listener.watchs.forEach((w: string) => {
                  let prev, next;
                  // check if w is a field or a composition
                  if (!controller.fields[w]) {
                    prev = controller.getContainerFieldValidation(
                      prevValidationsRef.current,
                      controller.fields,
                      w,
                      false,
                    );
                    next = controller.getContainerFieldValidation(
                      controller.state.validations || {},
                      controller.fields,
                      w,
                      false,
                    );
                    if (prev.status !== next.status || prev.message !== next.message) {
                      changed = true;
                    }
                  } else {
                    prev = prevValidationsRef.current[w];
                    const nextValidations = controller.state.validations || {};
                    next = nextValidations[w];
                    if (prev !== next) {
                      changed = true;
                    }
                  }
                  watchs.push(next);
                });
              } else if (type === 'submittingChange') {
                changed = prevSubmittingRef.current !== controller.state.submitting;
                watchs.push(controller.state.submitting);
              }

              if (changed) {
                if (listener.once) {
                  controller.offChange(type, listener.listener, listener.watchs);
                }
                listener.listener(...watchs);
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
