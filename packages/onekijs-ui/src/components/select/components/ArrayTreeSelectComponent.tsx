import useTreeSelectController from '../hooks/useTreeSelectController';
import { ArrayTreeSelectProps, TreeSelectItem } from '../typings';
import ControlledTreeSelectComponent from './ControlledTreeSelectComponent';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const ArrayTreeSelectComponent = <T extends any = any, I extends TreeSelectItem<T> = TreeSelectItem<T>>(
  props: ArrayTreeSelectProps<T, I>,
) => {
  const controller = useTreeSelectController<T, I>(props.dataSource, {
    adapter: props.adapter,
    fetchOnce: props.fetchOnce,
  });
  return <ControlledTreeSelectComponent {...props} controller={controller} />;
};

export default ArrayTreeSelectComponent;
