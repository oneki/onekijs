import { useCollection, CollectionBroker, useField, extractValidators } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Select from '../../select';
import { GridBodyCellProps, UseSelectColumnOptions } from '../typings';
import useFormGridContext from '../useFormGridContext';

const SelectCellComponent = (
  options: UseSelectColumnOptions<any, any>,
  broker: CollectionBroker<any, any>,
): React.FC<GridBodyCellProps<any, any>> => {
  const SelectCellComponent: React.FC<GridBodyCellProps<any, any>> = ({ column, rowIndex }) => {
    const { gridName } = useFormGridContext();
    const [validators] = extractValidators(options);
    const field = useField(`${gridName}.${rowIndex}.${column.id}`, validators);

    const collection = useCollection(options.dataSource, options);
    const service = collection.asService();

    useEffect(() => {
      broker.addSubscriber(service);
      return () => {
        broker.removeSubscriber(service);
      };
    }, [service]);

    return <Select {...options} {...field} items={collection} className={'o-grid-select'} />;
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
