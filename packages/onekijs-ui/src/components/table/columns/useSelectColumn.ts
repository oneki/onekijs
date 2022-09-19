import { useLazyRef } from 'onekijs-framework';
import DefaultSelectBroker from '../../select/SelectBroker';
import { SelectBroker, SelectItem } from '../../select/typings';
import SelectCellComponent from '../components/cells/SelectCellComponent';
import { SelectCell, SelectColumn, TableItem, UseSelectColumnOptions } from '../typings';

const useSelectColumn = <
  T = any,
  S = any,
  TI extends TableItem<T> = TableItem<T>,
  SI extends SelectItem<S> = SelectItem<S>,
>(
  options: UseSelectColumnOptions<T, S, TI, SI>,
): SelectColumn<T, S, TI, SI> => {
  const opts = Object.assign({}, options, { brokerable: true })
  const broker = useLazyRef<SelectBroker<S, SI>>(() => {
    return new DefaultSelectBroker(opts.dataSource, opts);
  });
  const Component: SelectCell<T, S, TI, SI> = opts.CellComponent || (SelectCellComponent as any);
  const optionsRef = useLazyRef<SelectColumn<T, S, TI, SI>>(() => {
    return Object.assign(
      {
        filterable: false,
        sortable: false,
      },
      opts,
      {
        CellComponent: Component(opts, broker.current),
        broker: broker.current,
      },
    );
  });
  return optionsRef.current;
};

export default useSelectColumn;
