import { CollectionBroker, useField, extractValidators } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Select from '../../../select';
import useSelectController from '../../../select/hooks/useSelectController';
import { TableBodyCellProps, UseSelectColumnOptions } from '../../typings';
import useFormTableContext from '../../hooks/useFormTableContext';
import { SelectItem } from '../../../select/typings';

const SelectCellComponent = (
  options: UseSelectColumnOptions<any, SelectItem<any>>,
  broker: CollectionBroker<any, SelectItem<any>>,
): React.FC<TableBodyCellProps> => {
  const SelectCellComponent: React.FC<TableBodyCellProps> = ({ column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const [validators] = extractValidators(options);
    const field = useField(`${tableName}.${rowIndex}.${column.id}`, validators);

    const controller = useSelectController(options.dataSource, options);

    useEffect(() => {
      broker.addSubscriber(controller);
      return () => {
        broker.removeSubscriber(controller);
      };
    }, [controller]);

    return <Select {...options} {...field} controller={controller} className={'o-table-select'} />;
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
