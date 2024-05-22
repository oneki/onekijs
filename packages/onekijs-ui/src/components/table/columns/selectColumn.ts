import { get } from 'onekijs-framework';
import DefaultSelectBroker from '../../select/SelectBroker';
import { SelectItem, SelectItemAdapter } from '../../select/typings';
import SelectCellComponent from '../components/cells/SelectCellComponent';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
import { SelectCell, SelectColumn, SelectColumnOptions, TableCellSerializer, TableItem } from '../typings';
import defaultCellSerializer from '../seralizers/defaultCellSerializer';

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
      const entry = (opts.dataSource as [S, string][]).find((entry) => entry[0] === data);
      return {
        text: entry ? entry[1] : ''
      }
    };
    opts.adapter = adapter;
  }

  const serializer: TableCellSerializer<T, TI> = (data: any, column, format) => {
    const value = get(data, column.id, null);
    if (Array.isArray(opts.dataSource)) {
      const entry = (opts.dataSource as [S, string][]).find((item) => {
        if (Array.isArray(item)) {
          if (item[0] === value) {
            return true;
          }
        }
        return false;
      })
      if (entry && Array.isArray(entry)) {
        return entry[1];
      }
    }

    return defaultCellSerializer(data, column, format);
  }

  const broker = new DefaultSelectBroker(dataSource, opts);

  const Component: SelectCell<T, S, TI, SI> = opts.CellComponent || (SelectCellComponent as any);

  return Object.assign(
    {
      filterable: false,
      sortable: false,
      Displayer: DefaultCellDisplayer,
      serializer,
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
