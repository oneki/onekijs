import { extractValidators, get, LoadingStatus } from 'onekijs-framework';
import React from 'react';
import Input from '../../input';
import { TableBodyCellProps, UseInputColumnOptions } from '../typings';
import useFormTableContext from '../hooks/useFormTableContext';

const InputCellComponent = (options: UseInputColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const InputCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ column, rowIndex, item }) => {
    const { tableName, init } = useFormTableContext();
    const [validators] = extractValidators(options);
    let field = {};
    console.log(item);
    if (item?.loadingStatus === LoadingStatus.Loaded) {
      field = init(`${tableName}.${rowIndex}.${column.id}`, validators);
      return <Input {...options} {...field} value={get(item, `data.${column.id}`, '')} className={'o-table-input'} />;
    }
    return null;
  };
  InputCellComponent.displayName = 'InputCellComponent';
  return InputCellComponent;
};

export default InputCellComponent;
