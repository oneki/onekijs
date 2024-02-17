import React from 'react';
import { addClassname } from '../../../../utils/style';
import FormInput from '../../../input/FormInput';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, InputColumnOptions } from '../../typings';

const InputCellComponent = (options: InputColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const InputCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ item, column, rowIndex }) => {
    const { tableName, editable } = useFormTableContext();

    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;

    // if the id is empty, it's a single table column and the value is the row itself
    const name = column.id ? `${tableName}.${rowIndex}.${column.id}` : `${tableName}.${rowIndex}`;

    return (
      <FormInput
        size="small"
        layout="table"
        {...options}
        name={name}
        className={addClassname('o-table-input', className)}
        editable={editable ?? options.editable}
      />
    );
  };
  InputCellComponent.displayName = 'InputCellComponent';
  return InputCellComponent;
};

export default InputCellComponent;
