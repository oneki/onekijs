import { CollectionBroker } from 'onekijs-framework';
import React, { useEffect } from 'react';
import { addClassname } from '../../../../utils/style';
import FormSelect from '../../../select/FormSelect';
import useSelectController from '../../../select/hooks/useSelectController';
import { SelectItem } from '../../../select/typings';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, UseSelectColumnOptions } from '../../typings';

const SelectCellComponent = (
  options: UseSelectColumnOptions<any, SelectItem<any>>,
  broker: CollectionBroker<any, SelectItem<any>>,
): React.FC<TableBodyCellProps> => {
  const SelectCellComponent: React.FC<TableBodyCellProps> = ({ item, column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const controller = useSelectController(options.dataSource, Object.assign({}, options, broker.getInitialQuery()));
    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;

    useEffect(() => {
      broker.addSubscriber(controller);
      return () => {
        broker.removeSubscriber(controller);
      };
    }, [controller]);

    return (
      <FormSelect
        size="small"
        layout="table"
        {...options}
        name={`${tableName}.${rowIndex}.${column.id}`}
        className={addClassname('o-table-select', className)}
      />
    );
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
