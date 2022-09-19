import React from 'react';
import { addClassname } from '../../../../utils/style';
import FormTextarea from '../../../textarea/FormTextarea';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, UseTextareaColumnOptions } from '../../typings';

const TextareaCellComponent = (options: UseTextareaColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const TextareaCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ item, column, rowIndex }) => {
    const { tableName } = useFormTableContext();

    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;
    return (
      <FormTextarea
        size="small"
        layout="table"
        {...options}
        name={`${tableName}.${rowIndex}.${column.id}`}
        className={addClassname('o-table-textarea', className)}
      />
    );
  };
  TextareaCellComponent.displayName = 'TextareaCellComponent';
  return TextareaCellComponent;
};

export default TextareaCellComponent;
