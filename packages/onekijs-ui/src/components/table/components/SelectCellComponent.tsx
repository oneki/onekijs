import { CollectionBroker, useField, extractValidators } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Select from '../../select';
import useSelectDataSource from '../../select/hooks/useSelectDataSource';
import { TableBodyCellProps, TableItem, UseSelectColumnOptions } from '../typings';
import useFormTableContext from '../hooks/useFormTableContext';

const SelectCellComponent = (
  options: UseSelectColumnOptions<any, TableItem<any>>,
  broker: CollectionBroker<any, TableItem<any>>,
): React.FC<TableBodyCellProps> => {
  const SelectCellComponent: React.FC<TableBodyCellProps> = ({ column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const [validators] = extractValidators(options);
    const field = useField(`${tableName}.${rowIndex}.${column.id}`, validators);

    const collection = useSelectDataSource(options.dataSource, options);

    useEffect(() => {
      broker.addSubscriber(collection);
      return () => {
        broker.removeSubscriber(collection);
      };
    }, [collection]);

    return <Select {...options} {...field} dataSource={collection} className={'o-table-select'} />;
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
