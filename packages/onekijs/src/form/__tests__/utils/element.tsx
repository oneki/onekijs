import { FormOptions } from '../../typings';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

export const interact = (
  element: HTMLElement,
  submit: HTMLElement,
  test: { options?: FormOptions },
  value?: string | boolean | number | undefined,
): void => {
  if (value !== undefined && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
    if (element instanceof HTMLInputElement && element.type === 'checkbox') {
      const currentValue = element.checked;
      if (currentValue !== Boolean(value)) {
        fireEvent.click(element);
      }
    } else {
      userEvent.clear(element);
      userEvent.type(element, String(value));
    }
  } else if (value !== undefined && element instanceof HTMLSelectElement) {
    fireEvent.change(element, { target: { value: String(value) } });
  }
  if (test.options?.touchOn === 'focus') {
    element.focus();
  } else if (test.options?.touchOn === 'blur') {
    element.focus();
    submit.focus();
  }
};

export const checkValue = (element: HTMLElement, value: string | boolean | number | undefined): void => {
  if (element instanceof HTMLInputElement) {
    if (element.type === 'checkbox') {
      if (value === true) expect(element).toBeChecked();
      else expect(element).not.toBeChecked();
    } else {
      expect(element).toHaveDisplayValue(String(value || ''));
    }
  } else if (element instanceof HTMLSelectElement) {
    if (value !== undefined) {
      expect(element).toHaveValue(String(value));
    }
  }
};
