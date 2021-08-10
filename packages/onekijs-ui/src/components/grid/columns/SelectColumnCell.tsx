import { useCollection, CollectionBroker, get } from 'onekijs-framework';
import React, { useEffect } from 'react';
import Select from '../../select';
import { GridBodyCellProps } from '../typings';
import { UseSelectColumnOptions } from './useSelectColumn';

const SelectColumnCellComponent = (
  options: UseSelectColumnOptions<any, any>,
  broker: CollectionBroker<any, any>,
): React.FC<GridBodyCellProps<any, any>> => {
  const SelectColumnCellComponent = ({ column, rowValue, onBlur, onChange, onFocus }: GridBodyCellProps) => {
    const collection = useCollection(options.dataSource, options);
    const service = collection.asService();

    useEffect(() => {
      broker.addSubscriber(service);
      return () => {
        broker.removeSubscriber(service);
      };
    }, [service]);

    return (
      <Select
        {...options}
        onBlur={() => onBlur(column.id)}
        onChange={(nextValue: any) => onChange(column.id, nextValue)}
        onFocus={() => onFocus(column.id)}
        value={get(rowValue.data, column.id)}
        items={collection}
        className={'o-grid-select'}
      />
    );
  };
  SelectColumnCellComponent.displayName = 'SelectColumnCellComponent';
  return SelectColumnCellComponent;
};

export default SelectColumnCellComponent;
