import DefaultSelectBroker from '../../select/SelectBroker';
import { SelectItem, SelectItemAdapter } from '../../select/typings';
import SelectCellComponent from '../components/cells/SelectCellComponent';
import { SelectCell, SelectColumn, SelectColumnOptions, TableItem } from '../typings';

const selectColumn = <
  T = any,
  S = any,
  TI extends TableItem<T> = TableItem<T>,
  SI extends SelectItem<S> = SelectItem<S>,
>(
  id: string,
  options: SelectColumnOptions<T, S, TI, SI>,
): SelectColumn<T, S, TI, SI> => {
  const opts = Object.assign({}, options, { brokerable: true });
  let dataSource: S[] | string | undefined;

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

  const broker = new DefaultSelectBroker(dataSource, opts);

  const Component: SelectCell<T, S, TI, SI> = opts.CellComponent || (SelectCellComponent as any);

  return Object.assign(
    {
      filterable: false,
      sortable: false,
    },
    opts,
    {
      id,
      CellComponent: Component(opts, broker),
      broker: broker,
    },
  );
};

export default selectColumn;
