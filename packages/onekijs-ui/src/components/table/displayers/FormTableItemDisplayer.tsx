import React from 'react';
import { addClassname } from '../../../utils/style';
import { FormTableItemDisplayerProps } from '../typings';

const FormTableItemDisplayer: React.FC<FormTableItemDisplayerProps> = ({
  value,
  columns,
  first,
  last,
  className,
  format,
  name,
  index,
}) => {
  const userColumns = columns.filter((c) => !c.id.startsWith('system.'));
  const monoColumnTable = userColumns.length === 1 && !userColumns[0].id;
  const classNames = monoColumnTable
    ? 'o-form-mono-column-table-item-displayer'
    : `o-form-table-item-displayer${first ? ' o-form-table-item-displayer-first' : ''}${
        last ? ' o-form-table-item-displayer-last' : ''
      }`;
  return (
    <div className={addClassname(classNames, className)}>
      {userColumns.map((column, colIndex) => {
        const Displayer = column.Displayer;
        if (Displayer) {
          return (
            <Displayer
              column={column}
              firstRow={first}
              lastRow={last}
              rowIndex={index}
              firstCol={colIndex === 0}
              lastCol={colIndex === columns.length - 1}
              colIndex={colIndex}
              format={format}
              value={value}
              rowName={name}
              key={`col-${colIndex}`}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default FormTableItemDisplayer;
