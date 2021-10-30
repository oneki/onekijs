import { extractValidators, get } from 'onekijs-framework';
import React from 'react';
import Input from '../../input';
import { TableBodyCellProps, UseInputColumnOptions } from '../typings';
import useFormTableContext from '../useFormTableContext';

const InputCellComponent = (options: UseInputColumnOptions<any, any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const InputCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ column, rowIndex, rowValue }) => {
    const { tableName, init } = useFormTableContext();
    const [validators] = extractValidators(options);
    const field = init(`${tableName}.${rowIndex}.${column.id}`, validators);

    return <Input {...options} {...field} value={get(rowValue.data, column.id, '')} className={'o-table-input'} />;
  };
  InputCellComponent.displayName = 'InputCellComponent';
  return InputCellComponent;
};

export default InputCellComponent;
