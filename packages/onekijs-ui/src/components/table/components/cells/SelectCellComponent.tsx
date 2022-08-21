import { CollectionBroker, extractValidators, useField, useValidation } from 'onekijs-framework';
import React, { useEffect } from 'react';
import FieldDescription from '../../../field/FieldDescription';
import Select from '../../../select';
import useSelectController from '../../../select/hooks/useSelectController';
import { SelectItem } from '../../../select/typings';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, UseSelectColumnOptions } from '../../typings';

const SelectCellComponent = (
  options: UseSelectColumnOptions<any, SelectItem<any>>,
  broker: CollectionBroker<any, SelectItem<any>>,
): React.FC<TableBodyCellProps> => {
  const SelectCellComponent: React.FC<TableBodyCellProps> = ({ column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    const [validators] = extractValidators(options);
    const field = useField(`${tableName}.${rowIndex}.${column.id}`, validators, {
      defaultValue: options.defaultValue ? options.defaultValue : options.multiple ? [] : null,
    });
    const validation = useValidation(`${tableName}.${rowIndex}.${column.id}`);
    const status = validation?.status;
    const message = validation?.message;
    const size = options.size || 'small';

    const controller = useSelectController(options.dataSource, Object.assign({}, options, broker.getInitialQuery()));

    useEffect(() => {
      broker.addSubscriber(controller);
      return () => {
        broker.removeSubscriber(controller);
      };
    }, [controller]);

    return (
      <>
        <Select
          {...options}
          size={size}
          {...field}
          controller={controller}
          className={'o-table-select'}
          status={validation.status}
        />
        {message && <FieldDescription content={message} className={`o-field-description-${status.toLowerCase()}`} />}
      </>
    );
  };
  SelectCellComponent.displayName = 'SelectCellComponent';
  return SelectCellComponent;
};

export default SelectCellComponent;
