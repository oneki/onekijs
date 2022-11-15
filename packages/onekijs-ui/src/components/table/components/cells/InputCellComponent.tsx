import React from 'react';
import { addClassname } from '../../../../utils/style';
import FormInput from '../../../input/FormInput';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, InputColumnOptions } from '../../typings';

const InputCellComponent = (options: InputColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const InputCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ item, column, rowIndex }) => {
    const { tableName } = useFormTableContext();

    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;
    return (
      <FormInput
        size="small"
        layout="table"
        {...options}
        name={`${tableName}.${rowIndex}.${column.id}`}
        className={addClassname('o-table-input', className)}
      />
    );
  };
  InputCellComponent.displayName = 'InputCellComponent';
  return InputCellComponent;
};

export default InputCellComponent;
