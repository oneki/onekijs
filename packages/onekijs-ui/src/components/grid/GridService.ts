import {
  AnonymousObject,
  CollectionService,
  isCollectionFetching,
  isCollectionInitializing,
  reducer,
  service,
  set,
} from 'onekijs-framework';
import React from 'react';
import { toArray } from 'onekijs';
import {
  GridBodyProps,
  GridBodyRowProps,
  GridColumn,
  GridColumnWidth,
  GridController,
  GridFooterProps,
  GridHeaderProps,
  GridItem,
  GridItemMeta,
  GridRowHandler,
  GridState,
} from './typings';

export const parseColumnWidth = (width: string | number = 'auto'): GridColumnWidth => {
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
class GridService<T = any, M extends GridItemMeta = GridItemMeta, S extends GridState<T, M> = GridState<T, M>>
  extends CollectionService<T, M, S>
  implements GridController<T, M> {
  // The grid has three init steps
  //  - unmounted => data are not yet loaded
  //  - initializing -> the first render (with real data) is in progress
  //  - mounted -> the first render is done
  protected _step: 'unmounted' | 'mounted' | 'initializing' = 'unmounted';

  // contains a reference to each initial cells (the one built during the initial render)
  protected cells: AnonymousObject<AnonymousObject<React.RefObject<HTMLDivElement>>> = {};

  // ref of the grid container
  protected gridRef: React.RefObject<HTMLDivElement> | null = null;

  // ref of the body container
  protected contentRef: React.RefObject<HTMLDivElement> | null = null;

  get bodyClassName(): string | ((context: GridController<T, M>) => string) | undefined {
    return this.state.bodyClassName;
  }

  get BodyComponent(): React.FC<GridBodyProps<T>> | undefined {
    return this.state.BodyComponent;
  }

  get columns(): GridColumn<T, M>[] {
    return this.state.columns;
  }

  get filterable(): boolean | undefined {
    return this.state.filterable;
  }

  get fit(): boolean {
    return this.state.fit === false ? false : true;
  }

  get fixHeader(): boolean {
    return this.state.fixHeader === false ? false : true;
  }

  get footer(): boolean | undefined {
    return this.state.footer;
  }

  get footerClassName(): string | ((context: GridController<T, M>) => string) | undefined {
    return this.state.footerClassName;
  }

  get FooterComponent(): React.FC<GridHeaderProps> | undefined {
    return this.state.FooterComponent;
  }

  get grow(): string | undefined {
    return this.state.grow;
  }

  get header(): boolean | undefined {
    return this.state.header;
  }

  get headerClassName(): string | ((context: GridController<T, M>) => string) | undefined {
    return this.state.headerClassName;
  }

  get HeaderComponent(): React.FC<GridHeaderProps> | undefined {
    return this.state.HeaderComponent;
  }

  get height(): string | undefined {
    return this.state.height;
  }

  get onRowClick(): GridRowHandler<T, M> | undefined {
    return this.state.onRowClick;
  }

  get onRowEnter(): GridRowHandler<T, M> | undefined {
    return this.state.onRowEnter;
  }

  get onRowLeave(): GridRowHandler<T, M> | undefined {
    return this.state.onRowLeave;
  }

  get onRowOver(): GridRowHandler<T, M> | undefined {
    return this.state.onRowOver;
  }

  get onRowOut(): GridRowHandler<T, M> | undefined {
    return this.state.onRowOut;
  }

  get rowClassName(): string | ((rowData: T, context: GridController<T, M>) => string) | undefined {
    return this.state.rowClassName;
  }

  get RowComponent(): React.FC<GridBodyRowProps<T, M>> | undefined {
    return this.state.RowComponent;
  }

  get sortable(): boolean | undefined {
    return this.state.sortable;
  }

  get selected(): string[] | undefined {
    return this.state.selected;
  }

  get step(): 'unmounted' | 'mounted' | 'initializing' {
    return this._step;
  }

  asService(): GridService<T, M> {
    return this;
  }

  @reducer
  addColumn(column: GridColumn<T, M>, position?: number): void {
    if (position === undefined) {
      this.state.columns.push(column);
    } else {
      this.state.columns.splice(position, 0, column);
    }
    this.resetWidth();
  }

  @reducer
  addSelected(id: string | string[]): void {
    this.state.selected = [...new Set((this.state.selected || []).concat(toArray(id)))];
  }

  @reducer
  initCell(rowNumber: number | 'header' | 'footer', colId: string, ref: React.RefObject<HTMLDivElement>): boolean {
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
  onMount(gridRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>): void {
    this.gridRef = gridRef;
    this.contentRef = contentRef;
    if (this._step === 'initializing') {
      const fit = (contentRef.current?.offsetWidth || 0) <= (gridRef.current?.offsetWidth || 0);
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
  removeSelected(id: string | string[]): void {
    id = toArray(id);
    this.state.selected = (this.state.selected || []).filter((s) => !id.includes(s));
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
  setFooterComponent(FooterComponent?: React.FC<GridFooterProps>): void {
    this.state.FooterComponent = FooterComponent;
  }

  @reducer
  setHeader(header?: boolean): void {
    this.state.header = header;
  }

  @reducer
  setHeaderComponent(HeaderComponent?: React.FC<GridHeaderProps>): void {
    this.state.HeaderComponent = HeaderComponent;
  }

  @reducer
  setSelected(id: string | string[]): void {
    this.state.selected = toArray(id);
  }

  protected _adapt(data: T | undefined): GridItem<T, M> {
    const item = super._adapt(data);
    set(item.meta, 'selected', this.state.selected && item.id !== undefined && this.state.selected.includes(item.id));
    return item;
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

export default GridService;
