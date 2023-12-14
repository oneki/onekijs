import React, { SyntheticEvent, useCallback, useEffect } from 'react';
import { FCC } from '../types/core';
import { get, omit, pick, shallowEqual } from '../utils/object';
import ContainerValidation from './ContainerValidation';
import FieldValidation from './FieldValidation';
import {
  FormConfig,
  FormListenerType,
  FormMetadataListener,
  FormProps,
  FormSubmitListener,
  FormValidationListener,
  FormValueListener,
} from './typings';
import useForm, { FormContext } from './useForm';
import { getNonIndexedProp } from './utils';

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
  'reconfigure',
];

const FormComponent: FCC<React.FormHTMLAttributes<HTMLFormElement>> = (props) => {
  const service = useForm();
  const initializing = service.initializing;
  useEffect(() => {
    if (initializing) {
      service.onMount();
    }
  }, [service, initializing]);
  return <form {...props} />;
};

const Form: FCC<FormProps> = (props) => {
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
    for (const type of Object.keys(controller.listeners) as FormListenerType[]) {
      for (const prop of controller.pendingDispatch[type]) {
        const nonIndexedChangeProp = getNonIndexedProp(prop);
        for (const watch of Object.keys(controller.listeners[type])) {
          if (watch === prop || (type === 'valueChange' && watch === nonIndexedChangeProp)) {
            for (const listener of controller.listeners[type][watch]) {
              let changed = false;
              if (type === 'valueChange') {
                const prev = get(controller.prevValues, prop);
                const next = get(controller.state.values, prop, '');
                if (prev !== next || !controller.triggered[prop]) {
                  changed = true;
                  const prevWatchs =
                    listener.watchs.length > 1 ? listener.watchs.map((w) => get(controller.prevValues, w)) : prev;
                  const nextWatchs =
                    listener.watchs.length > 1 ? listener.watchs.map((w) => get(controller.state.values, w, '')) : next;
                  (listener.listener as FormValueListener)(nextWatchs, prevWatchs, prop);
                }
              } else if (type === 'validationChange') {
                let prev: FieldValidation | ContainerValidation;
                let next: FieldValidation | ContainerValidation;
                // check if w is a field or a composition
                if (!controller.fields[watch]) {
                  prev = controller.getContainerFieldValidation(
                    controller.prevValidations,
                    controller.fields,
                    watch,
                    false,
                    watch === ''
                  );
                  next = controller.getContainerFieldValidation(
                    controller.state.validations || {},
                    controller.fields,
                    watch,
                    false,
                    watch === ''
                  );
                  if (prev.status !== next.status || prev.message !== next.message) {
                    changed = true;
                  }
                } else {
                  prev = controller.prevValidations[watch];
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
                changed = controller.prevSubmitting !== controller.state.submitting;
                if (changed) {
                  (listener.listener as FormSubmitListener)(
                    controller.state.submitting || false,
                    controller.prevSubmitting,
                  );
                }
              } else if (type === 'metadataChange') {
                const prev = controller.prevMetadata[watch];
                const next = controller.state.metadata[watch];
                if (!shallowEqual(prev, next)) {
                  changed = true;
                  (listener.listener as FormMetadataListener)(next, prev, watch);
                }
              }

              if (changed && listener.once) {
                controller.offChange(type, listener.id);
              }
            }
          }
        }
        if (type === 'valueChange') {
          controller.triggered[prop] = true;
        }
      }
      controller.pendingDispatch[type].clear();
    }

    controller.prevValues = controller.state.values || {};
    controller.prevValidations = controller.state.validations || {};
    controller.prevSubmitting = controller.state.submitting || false;
    controller.prevMetadata = controller.state.metadata || {};
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
