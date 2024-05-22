import { AnonymousObject, CollectionService, reducer, service } from 'onekijs-framework';
import React from 'react';
import {
  TableColumn,
  TableColumnWidth,
  TableConfig,
  TableController,
  TableItem,
  TableSerializerFormat,
  TableState,
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
class TableService<T = any, I extends TableItem<T> = TableItem<T>, S extends TableState<T, I> = TableState<T, I>>
  extends CollectionService<T, I, S>
  implements TableController<T, I>
{
  // contains a reference to each initial cells (the one built during the initial render)
  protected cells: AnonymousObject<AnonymousObject<React.RefObject<HTMLDivElement>>> = {};

  // ref of the table container
  protected tableRef: React.RefObject<HTMLDivElement> | null = null;

  // ref of the body container
  protected contentRef: React.RefObject<HTMLDivElement> | null = null;

  // config coming from the component
  public config: TableConfig<T, I> | undefined;

  adapt(data: T | null | undefined): I {
    const item = super.adapt(data);
    item.selected = this.state.selected && this.state.selected.includes(item.uid);
    return item;
  }

  @reducer
  addColumn(column: TableColumn<T, I>, position?: number): void {
    // check if column is not already there
    const exist = this.state.columns.find((c) => c.id === column.id);
    if (exist === undefined) {
      if (position === undefined) {
        this.state.columns.push(column);
      } else {
        this.state.columns.splice(position, 0, column);
      }
      this.resetWidth();
    }
  }

  get columns(): TableColumn<T, I>[] {
    return this.state.columns;
  }

  @reducer
  initCell(
    rowNumber: number | 'header-title' | 'header-filter' | 'footer',
    colId: string,
    ref: React.RefObject<HTMLDivElement>,
  ): void {
    this.cells[colId] = this.cells[colId] || {};
    this.cells[colId][`${rowNumber}`] = ref;
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
  }

  serialize(data: T[], format: TableSerializerFormat): string {
    const serializer = this.config?.serializer;
    if (serializer) {
      return serializer(data, format);
    }

    const serializableColumns = (this.state.columns || []).filter((c) => c.serializer !== undefined);

    switch(format) {
      case 'csv':
        const csvRows = data.map((row) => {
          const columns = serializableColumns
            .map((c) => c.serializer!(row, c, format))
            .map((s) => {
              if (s === null) return '';
              const result = `${s}`;
              if (result.startsWith('"') && result.endsWith('"')) return result;  // the string is already escaped
              // escape only if the string contains a comma
              if (result.includes(',')) {
                return `"${result.replace(/"/g, '""')}"`
              }
              return result;
            });
          return columns.join(',');
        });
        return csvRows.join('\n');
      case 'json':
        const rows = data.map((row) => {
          return serializableColumns.reduce((accumulator, c) => {
            accumulator[c.title ?? c.id] = c.serializer!(row, c, format);
            return accumulator;
          }, {} as AnonymousObject);
        });
        return JSON.stringify(rows);
    }
  }

  @reducer
  toggle(item: I): void {
    this.setMeta('item', item, 'expanded', !item.expanded);
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
