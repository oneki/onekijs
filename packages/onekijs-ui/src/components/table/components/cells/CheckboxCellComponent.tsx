import React from 'react';
import { addClassname } from '../../../../utils/style';
import FormCheckbox from '../../../checkbox/FormCheckbox';
import useFormTableContext from '../../hooks/useFormTableContext';
import { TableBodyCellProps, CheckboxColumnOptions } from '../../typings';

const CheckboxCellComponent = (options: CheckboxColumnOptions<any, any>): React.FC<TableBodyCellProps<any, any>> => {
  const CheckboxCellComponent: React.FC<TableBodyCellProps<any, any>> = ({ item, column, rowIndex }) => {
    const { tableName } = useFormTableContext();
    // const [validators] = extractValidators(options);
    // const field = useField(`${tableName}.${rowIndex}.${column.id}`, validators, {
    //   defaultValue: options.defaultValue ? options.defaultValue : false,
    // });
    // const validation = useValidation(`${tableName}.${rowIndex}.${column.id}`);
    // const status = validation?.status;
    // const message = validation?.message;

    // return (
    //   <>
    //     <Checkbox {...options} {...field} className="o-table-checkbox" status={validation.status} />
    //     {message && <FieldDescription content={message} className={`o-field-description-${status.toLowerCase()}`} />}
    //   </>
    // );

    const { size, ...checkboxOptions } = options;

    const className =
      typeof options.className === 'function' ? options.className(item, column, rowIndex) : options.className;
    return (
      <FormCheckbox
        layout="table"
        {...checkboxOptions}
        name={`${tableName}.${rowIndex}.${column.id}`}
        className={addClassname('o-table-checkbox', className)}
      />
    );
  };
  CheckboxCellComponent.displayName = 'CheckboxCellComponent';
  return CheckboxCellComponent;
};

export default CheckboxCellComponent;
