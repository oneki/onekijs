import { isQueryFilterCriteria, QueryFilterOrCriteria } from 'onekijs-framework';
import { CSSProperties } from 'react';
import { TableColumn, TableItem } from './typings';

export const getCellWidth = (column: TableColumn<any, TableItem<any>>, fit?: boolean, grow?: string): CSSProperties => {
  const style: CSSProperties = {};
  if (column.computedWidth) {
    return column.computedWidth;
  } else if (column.width) {
    return { width: column.width };
  } else {
    const minWidth = column.minWidth;
    if (minWidth) {
      if (fit) {
        style.width = minWidth;
      } else {
        style.minWidth = minWidth;
      }
    }

    if (grow === column.id) {
      style.flexGrow = 1;
    } else if (!grow) {
      style.flexGrow = column.weight || 1;
      style.flexBasis = (column.weight || 1) + 'px';
    } else {
      style.flexBasis = (column.weight || 1) + 'px';
    }

    if (column.width) {
      if (fit) {
        style.width = column.width;
      } else {
        style.minWidth = column.width;
      }
    }
    return style;
  }
};

export const getValueFromFilter = (filter?: QueryFilterOrCriteria): unknown => {
  if (filter === undefined) {
    return undefined;
  }
  if (isQueryFilterCriteria(filter)) {
    return filter.value;
  }
  if (filter.criterias.length === 1) {
    if (isQueryFilterCriteria(filter.criterias[0])) {
      return filter.criterias[0].value;
    } else {
      return getValueFromFilter(filter.criterias[0]);
    }
  } else {
    return filter.criterias.map((c) => {
      return getValueFromFilter(c);
    });
  }
};
