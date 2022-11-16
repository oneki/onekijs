import { toArray } from 'onekijs-framework';
import React, { useState } from 'react';
import { addClassname } from '../../../../utils/style';
import Select from '../../../select';
import { useTableConfig } from '../../hooks/useTableConfig';
import useTableService from '../../hooks/useTableService';
import { TableColumn, TableFilterOperator, TableHeaderCellProps } from '../../typings';
import { getValueFromFilter } from '../../util';
import TableFilterOperatorComponent from './TableFilterOperatorComponent';

const addFilter = (
  controller: ReturnType<typeof useTableService>,
  value: unknown,
  column: TableColumn<unknown>,
  operator: TableFilterOperator,
) => {
  if (Array.isArray(value) && value.length > 0) {
    controller.addFilter({
      operator: 'or',
      criterias: value.map((v) => {
        return {
          field: column.id,
          operator: operator.operator,
          value: Array.isArray(v) ? v[0] : v,
        };
      }),
      id: column.id,
    });
  } else {
    controller.removeFilter(column.id);
  }
};

const operators: TableFilterOperator[] = [{ text: 'equals', operator: 'eq', not: false }];

const TableSelectFilterComponent: React.FC<TableHeaderCellProps & { dataSource: [unknown, string][] | string[] }> = ({
  column,
  dataSource,
}) => {
  const controller = useTableService();
  const filter = controller.getFilterById(column.id);
  const filterValue = toArray(getValueFromFilter(filter));
  const [currentOperator, setCurrentOperator] = useState<TableFilterOperator>(operators[0]);
  const onValueChange = (value: unknown) => {
    addFilter(controller, value, column, currentOperator);
  };

  const onOperatorChange = (operator: TableFilterOperator) => {
    setCurrentOperator(operator);
    if (filterValue) {
      addFilter(controller, filterValue, column, currentOperator);
    }
  };

  const { className } = useTableConfig();
  const scClassName = className ? className.split(' ').slice(0, 2).join(' ') : '';

  return (
    <div className="o-table-filter-select-container">
      <TableFilterOperatorComponent
        operators={operators}
        onChange={onOperatorChange}
        selected={currentOperator}
        className={filterValue && filterValue.length > 0 ? 'o-table-filter-active' : ''}
      />
      <Select
        className={addClassname('o-table-filter-select', scClassName)}
        multiple={true}
        dataSource={dataSource}
        value={filterValue}
        nullable={true}
        searchable={false}
        onChange={onValueChange}
        size="xsmall"
        attachDropdownToBody={true}
      />
    </div>
  );
};

TableSelectFilterComponent.displayName = 'TableInputFilterComponent';

export default TableSelectFilterComponent;
