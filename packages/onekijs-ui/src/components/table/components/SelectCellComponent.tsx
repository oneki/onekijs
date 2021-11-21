import { CollectionBroker, useField, extractValidators } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Select from '../../select';
import useSelectDataSource from '../../select/hooks/useSelectDataSource';
import { TableBodyCellProps, UseSelectColumnOptions } from '../typings';
import useFormTableContext from '../hooks/useFormTableContext';

const SelectCellComponent = (
  options: UseSelectColumnOptions<any, any>,
  broker: CollectionBroker<any, any>,
): React.FC<TableBodyCellProps<any, any>> => {
  const SelectCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ column, rowIndex }) => {
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

    return <Select {...options} {...field} items={collection} className={'o-table-select'} />;
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
