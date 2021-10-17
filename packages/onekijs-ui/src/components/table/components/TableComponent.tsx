import React, { useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableProps } from '../typings';
import { TableColumnsContext } from '../useTableColumns';
import { TableContext } from '../useTableController';
import { TableValueContext } from '../useTableValue';
import TableBodyComponent from './TableBodyComponent';
import TableFooterComponent from './TableFooterComponent';
import TableHeaderComponent from './TableHeaderComponent';

const TableComponent: React.FC<TableProps> = ({ controller, className }) => {
  const classNames = addClassname('o-table', className);
  const {
    BodyComponent = TableBodyComponent,
    FooterComponent = TableFooterComponent,
    header = true,
    HeaderComponent = TableHeaderComponent,
    footer = false,
    height,
  } = controller;

  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controller.onMount(tableRef, contentRef);
  });

  return (
    <TableContext.Provider value={controller.asService()}>
      <TableColumnsContext.Provider value={controller.columns}>
        <TableValueContext.Provider value={controller.items}>
          <div
            className={classNames}
            ref={tableRef}
            style={{
              maxHeight: height,
              overflow: 'auto',
            }}
          >
            {header && <HeaderComponent controller={controller} />}
            <BodyComponent controller={controller} tableRef={tableRef} contentRef={contentRef} />
            {footer && <FooterComponent controller={controller} />}
          </div>
        </TableValueContext.Provider>
      </TableColumnsContext.Provider>
    </TableContext.Provider>
  );
};

TableComponent.displayName = 'Table';

export default TableComponent;
