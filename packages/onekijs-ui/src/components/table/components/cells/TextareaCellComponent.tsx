import React from 'react';
import { addClassname } from '../../../../utils/style';
import FormTextarea from '../../../textarea/FormTextarea';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, TextareaColumnOptions } from '../../typings';

const TextareaCellComponent = (options: TextareaColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const TextareaCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ item, column, rowIndex }) => {
    const { tableName, editable } = useFormTableContext();

    // if the id is empty, it's a single table column and the value is the row itself
    const name = column.id ? `${tableName}.${rowIndex}.${column.id}` : `${tableName}.${rowIndex}`;

    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;
    return (
      <FormTextarea
        size="small"
        layout="table"
        {...options}
        name={name}
        className={addClassname('o-table-textarea', className)}
        editable={editable ?? options.editable}
      />
    );
  };
  TextareaCellComponent.displayName = 'TextareaCellComponent';
  return TextareaCellComponent;
};

export default TextareaCellComponent;
