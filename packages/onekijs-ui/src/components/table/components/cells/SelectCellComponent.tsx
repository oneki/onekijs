import React, { useEffect } from 'react';
import { addClassname } from '../../../../utils/style';
import FormSelect from '../../../select/FormSelect';
import useSelectController from '../../../select/hooks/useSelectController';
import { SelectBroker, SelectItem } from '../../../select/typings';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, TableItem, SelectColumnOptions } from '../../typings';

const SelectCellComponent = (
  options: SelectColumnOptions<any, any, TableItem<any>, SelectItem<any>>,
  broker: SelectBroker<any, SelectItem<any>>,
): React.FC<TableBodyCellProps> => {
  const SelectCellComponent: React.FC<TableBodyCellProps> = ({ item, column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const controller = useSelectController(options.dataSource, options);
    const service = controller.asService();
    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;
    const name = `${tableName}.${rowIndex}.${column.id}`;

    useEffect(() => {
      broker.addSubscriber(name, service);
      return () => {
        broker.removeSubscriber(name);
      };
    }, [name, service]);

    return (
      <FormSelect
        size="small"
        layout="table"
        {...options}
        name={name}
        className={addClassname('o-table-select', className)}
        controller={controller}
      />
    );
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
