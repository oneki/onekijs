import {
  AnonymousObject,
  CollectionBy,
  DefaultService,
  isCollectionFetching,
  isCollectionInitializing,
  reducer,
  service,
} from 'onekijs-framework';
import React from 'react';
import {
  TableColumn,
  TableColumnsCollection,
  TableColumnsState,
  TableColumnWidth,
  TableFooterProps,
  TableHeaderProps,
  TableItem,
} from './typings';

export const parseColumnWidth = (width: string | number = 'auto'): TableColumnWidth => {
  const regex = /^\s*(auto|(?:(?:([0-9]+)|(?:([0-9]+)\s*(px|%)))\s*(grow|force)?)|(grow))\s*$/;
  const match = `${width}`.match(regex);
  if (match === null || match[1] === 'auto') {
    return { auto: true };
  }
  let value: number | undefined;
  let force: boolean | undefined;
  let grow: boolean | undefined;

  if (match[2] !== undefined) {
    value = parseFloat(match[2]);
  } else if (match[3] !== undefined) {
    value = parseFloat(match[3]);
  }

  if (match[5] === 'force') {
    force = true;
  }

  if (match[5] === 'grow' || match[6] === 'grow') {
    grow = true;
  }

  return {
    force,
    grow,
    value,
    unit: match[4] as 'px' | '%' | undefined,
  };
};

@service
class TableColumnsService<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableColumnsState<T, I> = TableColumnsState<T, I>
> extends DefaultService<S> implements TableColumnsCollection<T, I, S> {
  @reducer
  addColumn(column: TableColumn<T, I>, position?: number): void {
    if (position === undefined) {
      this.state.columns.push(column);
    } else {
      this.state.columns.splice(position, 0, column);
    }
    this.resetWidth();
  }

  @reducer
  removeColumn(id: string): void {
    this.state.columns = this.state.columns.filter((c) => c.id !== id);
    this.resetWidth();
  }

  @reducer
  resetWidth(): void {
    this.state.columns.forEach((column) => {
      column.computedWidth = undefined;
    });
    this._step = 'initializing';
  }

  @reducer
  protected _setCellWidth(fit: boolean): void {
    const colWidths: AnonymousObject<number> = {};
    Object.keys(this.cells).forEach((colId) => {
      colWidths[colId] = Object.values(this.cells[colId]).reduce(
        (result, cellRef) => Math.max(result, cellRef.current?.offsetWidth || 0),
        0,
      );
    });

    const total = this.contentRef?.current?.offsetWidth || 0;
    if (total) {
      this.state.columns.forEach((column) => {
        const width = `${(colWidths[column.id] / total) * 100}%`;
        column.computedWidth = fit ? { width } : { minWidth: width };
      });
    }
  }
}

export default TableService;
