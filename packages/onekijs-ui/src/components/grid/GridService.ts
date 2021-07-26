import { DefaultService, reducer, service } from "@oneki/core";
import { Collection, isCollectionFetching, isCollectionInitializing } from "@oneki/collection";
import { GridColumn, GridState } from "./typings";
import { AnonymousObject } from "@oneki/types";

@service
class GridService<T, M> extends DefaultService<GridState<T,M>> {
  private collection: Collection<T, M> = null!;
  
  // this counter will have the number of cells to inspect to auto detect width
  // at the beginning the value can be null if the data are not yet loaded
  // once data are loaded, this counter is set to the number cells (colmuns * data length)
  // each time a cell is initialized, the counter is decreased by one
  // if the counter is greater than 0, no width is set on the cells and we let the flex layout determine the best size of the cell
  // once the counter reaches 0, we take the max width of each column cells and we force this width to all cells of the column (to have a grid layout)
  private counter: number|null = null;

  private cells: AnonymousObject<React.RefObject<HTMLDivElement>[]> = {};

  get columns(): (GridColumn<T,M>[]) {
    return this.state.columns;
  }

  get className(): (string|undefined) {
    return this.state.className;
  }  

  @reducer
  initCell(rowNumber: number, colId: string, ref: React.RefObject<HTMLDivElement>): boolean {
    let result = false;
    if (this.counter !== null) {
      result = true;
      if (this.counter > 0) {
        // width are not yet initialized
        this.cells[colId] = this.cells[colId] || []
        this.cells[colId][rowNumber] = ref;
        if (--this.counter === 0) {
          this.setCellWidth();
        }
      }
    }
    return result;
  }  

  onCollectionChange(nextCollection: Collection<T,M>) {
    this.collection = nextCollection;
    if (this.counter === null && !isCollectionFetching(this.collection) && !isCollectionInitializing(this.collection)) {
      if (this.collection.items) {
        this.counter = this.state.columns.length * this.collection.items.length;
      }
    }
  }

  @reducer
  private setCellWidth() {
    const colWidths: AnonymousObject<number> = {}
    Object.keys(this.cells).forEach((colId) => {
      colWidths[colId] = this.cells[colId].reduce((result, cellRef) => Math.max(result, cellRef.current?.offsetWidth || 0), 0)
    })

    //TODO: do actual calculations
    this.state.columns.forEach(column => {
      column.computedWidth = `${colWidths[column.id]}px`;
    })
  }  
}

export default GridService;