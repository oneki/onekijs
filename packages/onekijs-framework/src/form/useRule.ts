import { useEffect } from 'react';
import { applyFilter, deserializeFilterOrCriteria, formatFilter } from '../collection/utils';
import useLazyRef from '../core/useLazyRef';
import { FormFieldControllerRegistry, FormRule } from '../types/form';
import { toArray } from '../utils/object';
import { generateUniqueId } from '../utils/string';
import FormService from './FormService';
import { FormValueListener } from './typings';

export function useRule(
  form: FormService,
  rule: FormRule | FormRule[],
  controllerRegistry?: FormFieldControllerRegistry,
  context?: any,
): void {
  const listenerIds = useLazyRef(() => {
    const result: string[] = [];
    const rules = toArray(rule);
    rules.forEach((r) => {
      const ruleId = generateUniqueId();
      const valueListener: FormValueListener = () => {
        let condition = true;
        if (r.when) {
          condition = applyFilter(
            {
              data: Object.assign(
                {},
                {
                  $context: context ?? form.getContext(),
                },
                form.getValue(),
              ),
            },
            formatFilter(r.when),
          );
        }

        toArray(r.hide).forEach((fieldName) => {
          form.hide(fieldName, condition);
        });
        toArray(r.show).forEach((fieldName) => {
          form.show(fieldName, condition);
        });
        toArray(r.disable).forEach((fieldName) => {
          form.disable(fieldName, condition);
        });
        toArray(r.enable).forEach((fieldName) => {
          form.enable(fieldName, condition);
        });
        toArray(r.set_error).forEach((validation) => {
          form.setError(validation.field, `error-${ruleId}`, validation.message, condition);
        });
        toArray(r.set_warning).forEach((validation) => {
          form.setWarning(validation.field, `warning-${ruleId}`, validation.message, condition);
        });

        if (condition) {
          toArray(r.set_value).forEach((value) => {
            form.setValue(value.field, value.value);
          });
          toArray(r.append_value).forEach((value) => {
            const currentValue = form.getValue(value.field) ?? [];
            if (Array.isArray(currentValue)) {
              form.setValue(value.field, [...currentValue, value.value]);
            } else {
              form.setValue(value.field, [currentValue, value.value]);
            }
          });
          toArray(r.insert_value).forEach((value) => {
            const currentValue = form.getValue(value.field) ?? [];
            if (Array.isArray(currentValue)) {
              const newValue = [...currentValue];
              newValue.splice(value.position, 0, value.value);
              form.setValue(value.field, newValue);
            } else {
              form.setValue(value.field, [value.value]);
            }
          });
          toArray(r.remove_value).forEach((value) => {
            const currentValue = form.getValue(value.field) ?? [];
            if (Array.isArray(currentValue)) {
              const newValue = [...currentValue];
              newValue.splice(value.position, 1);
              form.setValue(value.field, newValue);
            } else {
              form.setValue(value.field, undefined);
            }
          });
          toArray(r.disable_validator).forEach((validator) => {
            form.disableValidator(validator.field, validator.name);
          });
          toArray(r.enable_validator).forEach((validator) => {
            form.enableValidator(validator.field, validator.name);
          });
        } else {
          toArray(r.disable_validator).forEach((validator) => {
            form.enableValidator(validator.field, validator.name);
          });
          toArray(r.enable_validator).forEach((validator) => {
            form.disableValidator(validator.field, validator.name);
          });
          toArray(r.add_filter).forEach((fieldFilter) => {
            const controller = controllerRegistry?.getController(fieldFilter.field);
            if (controller && controller.addFilter) {
              toArray(fieldFilter.filter).forEach((f) => {
                if (typeof f === 'string') {
                  f = deserializeFilterOrCriteria(f) || { operator: 'and', criterias: [] };
                }
                controller.addFilter(f);
              });
            }
          });
          toArray(r.remove_filter).forEach((fieldFilter) => {
            const controller = controllerRegistry?.getController(fieldFilter.field);
            if (controller && controller.removeFilter) {
              toArray(fieldFilter.filterId).forEach((filterId) => {
                controller.removeFilter(filterId);
              });
            }
          });
        }
      };
      form.onValueChange(ruleId, valueListener, r.event === 'onInit' ? '' : r.watch ?? [], r.event === 'onInit');
      result.push(ruleId);
    });
    return result;
  });

  useEffect((): (() => void) => {
    return (): void => {
      listenerIds.current.forEach((listenerId) => {
        form.offValueChange(listenerId);
      });
    };
  }, [listenerIds, form]);
}
