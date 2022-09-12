import { clone, CollectionBroker } from 'onekijs-framework';
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
    const controller = useSelectController(broker.getInitialDataSource() || [], Object.assign({}, options, broker.getInitialQuery()));
    const service = controller.asService();
    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;

    useEffect(() => {
      broker.addSubscriber(service);
      return () => {
        broker.removeSubscriber(service);
      };
    }, [service]);

    return (
      <FormSelect
        size="small"
        layout="table"
        {...options}
        name={`${tableName}.${rowIndex}.${column.id}`}
        className={addClassname('o-table-select', className)}
        controller={controller}
      />
    );
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
