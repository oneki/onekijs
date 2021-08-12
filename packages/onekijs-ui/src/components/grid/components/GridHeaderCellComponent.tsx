import React, { FC, useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { GridHeaderCellProps } from '../typings';
import useGridController from '../useGridController';
import { getCellWidth } from '../util';
import GridInputFilterComponent from './filters/GridInputFilterComponent';
import GridSortComponent from './GridSortComponent';

const GridHeaderCellComponent: FC<GridHeaderCellProps> = React.memo(({ column, filter, sort }) => {
  const controller = useGridController();
  const { initCell, fit, grow, sortable, filterable } = controller;
  const ref = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);
  const isSortable = column.sortable || (column.sortable === undefined && sortable !== false);
  const isFilterable = column.sortable || (column.filterable === undefined && filterable !== false);

  const className =
    typeof column.headerClassName === 'function' ? column.headerClassName(column, controller) : column.headerClassName;

  const onSort = () => {
    if (isSortable) {
      controller.sortBy({
        id: column.id,
        field: column.id,
        dir: sort && sort.dir !== 'desc' ? 'desc' : 'asc',
      });
    }
  };

  useEffect(() => {
    if (!initializedRef.current && ref.current !== null) {
      initializedRef.current = initCell('header', column.id, ref);
    }
  });

  return (
    <div className={addClassname('o-grid-header-cell', className)} style={getCellWidth(column, fit, grow)}>
      <div
        ref={ref}
        className={`o-grid-header-cell-title${isSortable ? ' o-grid-header-cell-sortable' : ''}`}
        onClick={onSort}
      >
        <span>{column.title}</span>
        {sort && <GridSortComponent sort={sort} column={column} />}
      </div>
      {isFilterable && <GridInputFilterComponent column={column} filter={filter} />}
    </div>
  );
});

GridHeaderCellComponent.displayName = 'GridHeaderCell';

export default GridHeaderCellComponent;
