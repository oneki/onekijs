import { get } from '../utils/object';
import { useMemo } from 'react';
import { useFormContext } from './context';
import { useIsomorphicLayoutEffect } from '../utils/hook';

export const useFormRule = function (rule, watchers = []) {
  const values = watchers.map(w => get(this.state.values, w));

  useMemo(() => {
    rule.apply(undefined, values);
    // eslint-disable-next-line
  }, values);
};

export const useRule = (rule, watchers = []) => {
  const { onValueChange, offValueChange } = useFormContext();
  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      rule.apply(this, arguments);
    };
    onValueChange(listener, watchers);
    return () => {
      offValueChange(listener, watchers);
    };
    // eslint-disable-next-line
  }, []);
};
