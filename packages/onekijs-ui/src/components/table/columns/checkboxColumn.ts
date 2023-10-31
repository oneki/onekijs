import CheckboxCellComponent from '../components/cells/CheckboxCellComponent';
import DefaultCellDisplayer from '../displayers/DefaultCellDisplayer';
import { CheckboxColumn, CheckboxColumnOptions, TableItem } from '../typings';

const checkboxColumn = <T = any, I extends TableItem<T> = TableItem<T>>(
  id: string,
  options: CheckboxColumnOptions<T, I>,
): CheckboxColumn<T, I> => {
  const Component = options.CellComponent || CheckboxCellComponent;
  return Object.assign(
    {
      filterable: false,
      sortable: false,
      className: 'o-checkbox-cell',
      Displayer: DefaultCellDisplayer,
    },
    options,
    {
      id,
      CellComponent: Component(options),
    },
  );
};

export default checkboxColumn;
