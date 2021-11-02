import {
  AnonymousObject,
  CollectionBy,
  CollectionService,
  isCollectionFetching,
  isCollectionInitializing,
  reducer,
  service,
} from 'onekijs-framework';
import React from 'react';
import {
  TableController,
  TableColumn,
  TableColumnWidth,
  TableFooterProps,
  TableHeaderProps,
  TableItem,
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
  implements TableController<T, I> {
  // The table has three init steps
  //  - unmounted => data are not yet loaded
  //  - initializing -> the first render (with real data) is in progress
  //  - mounted -> the first render is done
  protected _step: 'unmounted' | 'mounted' | 'initializing' = 'unmounted';

  // contains a reference to each initial cells (the one built during the initial render)
  protected cells: AnonymousObject<AnonymousObject<React.RefObject<HTMLDivElement>>> = {};

  // ref of the table container
  protected tableRef: React.RefObject<HTMLDivElement> | null = null;

  // ref of the body container
  protected contentRef: React.RefObject<HTMLDivElement> | null = null;

  adapt(data: T | undefined): I {
    const item = super.adapt(data);
    item.selected = this.state.selected && this.state.selected.includes(item.uid);
    return item;
  }

  get step(): 'unmounted' | 'mounted' | 'initializing' {
    return this._step;
  }

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
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    const items = this.setMeta(by, target, 'selected', true);
    this.state.selected = [...new Set((this.state.selected || []).concat(items.map((item) => item.uid)))];
    return items;
  }

  @reducer
  initCell(
    rowNumber: number | 'header-title' | 'header-filter' | 'footer',
    colId: string,
    ref: React.RefObject<HTMLDivElement>,
  ): boolean {
    let result = false;

    if (this._step !== 'mounted' && !isCollectionFetching(this) && !isCollectionInitializing(this)) {
      this._step = 'initializing';
    }

    if (this._step !== 'unmounted') {
      result = true;
      if (this._step === 'initializing') {
        // width are not yet computed
        this.cells[colId] = this.cells[colId] || {};
        this.cells[colId][`${rowNumber}`] = ref;
      }
    }
    return result;
  }

  @reducer
  onMount(tableRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void {
    this.tableRef = tableRef;
    this.contentRef = contentRef;
    if (this._step === 'initializing') {
      const fit = (contentRef.current?.offsetWidth || 0) <= (tableRef.current?.offsetWidth || 0);
      this._setCellWidth(fit);
      this._step = 'mounted';
    }
  }

  @reducer
  removeColumn(id: string): void {
    this.state.columns = this.state.columns.filter((c) => c.id !== id);
    this.resetWidth();
  }

  @reducer
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    const items = this.setMeta(by, target, 'selected', false);
    const removeUids = items.map((item) => item.uid);
    this.state.selected = (this.state.selected || []).filter((s) => !removeUids.includes(s));
    return items;
  }

  @reducer
  resetWidth(): void {
    this.state.columns.forEach((column) => {
      column.computedWidth = undefined;
    });
    this._step = 'initializing';
  }

  @reducer
  setFooter(footer?: boolean): void {
    this.state.footer = footer;
  }

  @reducer
  setFooterComponent(FooterComponent?: React.FC<TableFooterProps<T, I>>): void {
    this.state.FooterComponent = FooterComponent;
  }

  @reducer
  setHeader(header?: boolean): void {
    this.state.header = header;
  }

  @reducer
  setHeaderComponent(HeaderComponent?: React.FC<TableHeaderProps<T, I>>): void {
    this.state.HeaderComponent = HeaderComponent;
  }

  @reducer
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[] {
    const current = this.state.selected || [];
    this.setMeta('uid', current, 'selected', false);
    const items = this.setMeta(by, target, 'selected', true);
    this.state.selected = items.map((item) => item.uid);
    return items;
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
