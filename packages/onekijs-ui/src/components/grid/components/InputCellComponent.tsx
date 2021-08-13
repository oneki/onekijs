import { extractValidators, get } from 'onekijs-framework';
import React from 'react';
import Input from '../../input';
import { GridBodyCellProps, UseInputColumnOptions } from '../typings';
import useFormGridContext from '../useFormGridContext';

const InputCellComponent = (options: UseInputColumnOptions<any, any>): React.FC<GridBodyCellProps<any, any>> => {
  const InputCellComponent: React.FC<GridBodyCellProps<any, any>> = ({ column, rowIndex, rowValue }) => {
    const { gridName, init } = useFormGridContext();
    const [validators] = extractValidators(options);
    const field = init(`${gridName}.${rowIndex}.${column.id}`, validators);

    return <Input {...options} {...field} value={get(rowValue.data, column.id, '')} className={'o-grid-input'} />;
  };
  InputCellComponent.displayName = 'InputCellComponent';
  return InputCellComponent;
};

export default InputCellComponent;
