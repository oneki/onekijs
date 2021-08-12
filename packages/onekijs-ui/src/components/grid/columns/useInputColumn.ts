import { useLazyRef } from 'onekijs-framework';
import InputCellComponent from '../components/InputCellComponent';
import { GridItemMeta, InputColumn, UseInputColumnOptions } from '../typings';

const useInputColumn = <T = any, M extends GridItemMeta = GridItemMeta>(
  options: UseInputColumnOptions<T, M>,
): InputColumn<T, M> => {
  const optionsRef = useLazyRef<InputColumn<T, M>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
      },
      options,
      {
        CellComponent: InputCellComponent(options),
      },
    );
  });
  return optionsRef.current;
};

export default useInputColumn;
