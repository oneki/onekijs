import { get } from '../utils/object';
import { useMemo } from 'react';
import { useFormContext } from './context';
import { useIsomorphicLayoutEffect } from '../utils/hook';

export const useFormRule = function (rule, watch = []) {
  const values = watch.map(w => get(this.state.values, w));

  useMemo(() => {
    rule(...values);
    // eslint-disable-next-line
  }, values);
};

export const useRule = (rule, watch = []) => {
  const { onValueChange, offValueChange } = useFormContext();
  useIsomorphicLayoutEffect(() => {
    const listener = function () {
      rule.apply(this, arguments);
    };

    onValueChange(listener, watch);

    return () => {
      offValueChange(listener, watch);
    };
    // eslint-disable-next-line
  }, []);
};
