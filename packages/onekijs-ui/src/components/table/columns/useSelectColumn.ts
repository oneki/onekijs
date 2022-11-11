import { useLazyRef } from 'onekijs-framework';
import DefaultSelectBroker from '../../select/SelectBroker';
import { SelectBroker, SelectItem, SelectItemAdapter } from '../../select/typings';
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
  const opts = Object.assign({}, options, { brokerable: true });
  let dataSource: S[] | string | undefined;
  const broker = useLazyRef<SelectBroker<S, SI>>(() => {
    if (Array.isArray(opts.dataSource) && Array.isArray(opts.dataSource[0])) {
      dataSource = (opts.dataSource as [S, string][]).map((entry) => entry[0]);
      const adapter: SelectItemAdapter<S> = (data: S) => {
        const item = opts.adapter ? opts.adapter(data) : {};
        if (!item.text) {
          const entry = (opts.dataSource as [S, string][]).find((entry) => entry[0] === data);
          item.text = entry ? entry[1] : '';
        }
        return item;
      };
      opts.adapter = adapter;
    }
    return new DefaultSelectBroker(dataSource, opts);
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
