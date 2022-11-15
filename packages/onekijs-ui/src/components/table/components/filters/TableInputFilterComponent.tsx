import React, { ChangeEvent, useState } from 'react';
import Input from '../../../input';
import useTableService from '../../hooks/useTableService';
import { TableFilterOperator, TableHeaderCellProps } from '../../typings';
import { getValueFromFilter } from '../../util';
import TableFilterOperatorComponent from './TableFilterOperatorComponent';

const TableInputFilterComponent: React.FC<TableHeaderCellProps & { operators: TableFilterOperator[] }> = ({
  column,
  operators,
}) => {
  const controller = useTableService();
  const filter = controller.getFilterById(column.id);
  const filterValue = `${getValueFromFilter(filter) || ''}`;
  const [value, setValue] = useState(filterValue);
  const [currentOperator, setCurrentOperator] = useState<TableFilterOperator>(operators[0]);
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      if (controller.state.local) {
        controller.addFilterCriteria(
          column.id,
          currentOperator.operator,
          e.target.value,
          currentOperator.not,
          column.id,
        );
      } else {
        setValue(e.target.value);
      }
    } else {
      setValue('');
      controller.removeFilter(column.id);
    }
  };

  const onOperatorChange = (operator: TableFilterOperator) => {
    setCurrentOperator(operator);
    if (value) {
      controller.addFilterCriteria(column.id, operator.operator, value, operator.not, column.id);
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!controller.state.local && e.key === 'Enter') {
      controller.addFilterCriteria(column.id, currentOperator.operator, value, currentOperator.not, column.id);
    }
  };

  return (
    <div className="o-table-filter-input-container">
      <TableFilterOperatorComponent
        operators={operators}
        onChange={onOperatorChange}
        selected={currentOperator}
        className={filterValue ? 'o-table-filter-active' : ''}
      />
      <Input
        className="o-table-filter-input"
        value={controller.state.local ? filterValue : value}
        onChange={onValueChange}
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

TableInputFilterComponent.displayName = 'TableInputFilterComponent';

export default TableInputFilterComponent;
