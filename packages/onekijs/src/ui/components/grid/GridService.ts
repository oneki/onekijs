import CollectionService from '../../../collection/CollectionService';
import { isCollectionFetching, isCollectionInitializing } from '../../../collection/utils';
import { reducer, service } from '../../../core/annotations';
import { AnonymousObject } from '../../../types/object';
import {
  GridBodyProps,
  GridBodyRowProps,
  GridColumn,
  GridColumnWidth,
  GridHeaderProps,
  GridItemMeta,
  GridProps,
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
class GridService<
  T = any,
  M extends GridItemMeta = GridItemMeta,
  S extends GridState<T, M> = GridState<T, M>
> extends CollectionService<T, M, S> {
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

  get bodyClassName(): string | ((context: GridService<T, M>) => string) | undefined {
    return this.state.bodyClassName;
  }

  get BodyComponent(): React.FC<GridBodyProps<T>> | undefined {
    return this.state.BodyComponent;
  }

  get className(): string | undefined {
    return this.state.className;
  }

  get columns(): GridColumn<T, M>[] {
    return this.state.columns;
  }

  get fit(): boolean {
    return this.state.fit === false ? false : true;
  }

  get fixHeader(): boolean {
    return this.state.fixHeader === false ? false : true;
  }

  get GridComponent():
    | React.ForwardRefExoticComponent<GridProps<T, M> & React.RefAttributes<HTMLDivElement>>
    | undefined {
    return this.state.GridComponent;
  }

  get grow(): string | undefined {
    return this.state.grow;
  }

  get headerClassName(): string | ((context: GridService<T, M>) => string) | undefined {
    return this.state.headerClassName;
  }

  get HeaderComponent(): React.FC<GridHeaderProps> | undefined {
    return this.state.HeaderComponent;
  }

  get height(): string | undefined {
    return this.state.height;
  }

  get rowClassName(): string | ((rowData: T, context: GridService<T, M>) => string) | undefined {
    return this.state.rowClassName;
  }

  get RowComponent(): React.FC<GridBodyRowProps<T, M>> | undefined {
    return this.state.RowComponent;
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
