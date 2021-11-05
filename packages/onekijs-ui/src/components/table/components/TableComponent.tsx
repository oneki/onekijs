import React, { useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableProps } from '../typings';
import { TableImmutableControllerContext, TableMutableControllerContext } from '../hooks/useTableController';
import { TableValueContext } from '../hooks/useTableValue';
import TableBodyComponent from './TableBodyComponent';
import TableFooterComponent from './TableFooterComponent';
import TableHeaderComponent from './TableHeaderComponent';

const TableComponent: React.FC<TableProps> = ({ controller, className }) => {
  const classNames = addClassname('o-table', className);
  const {
    bodyClassName,
    BodyComponent = TableBodyComponent,
    FooterComponent = TableFooterComponent,
    footerClassName,
    header = true,
    headerClassName,
    HeaderComponent = TableHeaderComponent,
    footer = false,
    height,
    columns,
    items,
  } = controller.state;

  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controller.onMount(tableRef, contentRef);
  });

  return (
    <TableImmutableControllerContext.Provider value={controller.asService()}>
      <TableMutableControllerContext.Provider value={controller}>
        <TableValueContext.Provider value={items}>
          <div
            className={classNames}
            ref={tableRef}
            style={{
              maxHeight: height,
              overflow: 'auto',
            }}
          >
            {header && <HeaderComponent columns={columns} className={headerClassName} />}
            <BodyComponent
              items={items || []}
              columns={columns}
              tableRef={tableRef}
              contentRef={contentRef}
              className={bodyClassName}
            />
            {footer && <FooterComponent columns={columns} className={footerClassName} />}
          </div>
        </TableValueContext.Provider>
      </TableMutableControllerContext.Provider>
    </TableImmutableControllerContext.Provider>
  );
};

TableComponent.displayName = 'Table';

export default TableComponent;
