import React from 'react';
import { addClassname } from '../../../../utils/style';
import FormCheckbox from '../../../checkbox/FormCheckbox';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, CheckboxColumnOptions } from '../../typings';

const CheckboxCellComponent = (options: CheckboxColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const CheckboxCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ item, column, rowIndex }) => {
    const { tableName } = useFormTableContext();

    const { size, ...checkboxOptions } = options;

    // if the id is empty, it's a single table column and the value is the row itself
    const name = column.id ? `${tableName}.${rowIndex}.${column.id}` : `${tableName}.${rowIndex}`;

    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;
    return (
      <FormCheckbox
        layout="table"
        {...checkboxOptions}
        name={name}
        className={addClassname('o-table-checkbox', className)}
      />
    );
  };
  CheckboxCellComponent.displayName = 'CheckboxCellComponent';
  return CheckboxCellComponent;
};

export default CheckboxCellComponent;
