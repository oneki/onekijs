import React, { useEffect, useMemo, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableConfigContext } from '../hooks/useTableConfig';
import { TableServiceContext } from '../hooks/useTableService';
import { TableStateContext } from '../hooks/useTableState';
import { ControllerTableProps, TableConfig } from '../typings';
import TableBodyComponent from './TableBodyComponent';
import TableFooterComponent from './TableFooterComponent';
import TableHeaderComponent from './TableHeaderComponent';

const ControllerTableComponent: React.FC<ControllerTableProps> = ({
  controller,
  className,
  bodyClassName,
  BodyComponent = TableBodyComponent,
  filterable,
  fit = true,
  fixHeader = true,
  grow,
  FooterComponent = TableFooterComponent,
  footerClassName,
  header = true,
  headerClassName,
  HeaderComponent = TableHeaderComponent,
  footer = false,
  height,
  highlightRow,
  onRowClick,
  onRowEnter,
  onRowLeave,
  onRowOver,
  onRowOut,
  rowClassName,
  RowComponent,
  sortable,
  stripRows,
}) => {
  const classNames = addClassname('o-table', className);
  const { columns, items } = controller.state;

  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controller.onMount(tableRef, contentRef);
  });

  const config: TableConfig = useMemo(() => {
    return {
      className,
      bodyClassName,
      BodyComponent,
      filterable,
      fit,
      fixHeader,
      footer,
      footerClassName,
      FooterComponent,
      grow,
      header,
      headerClassName,
      HeaderComponent,
      height,
      highlightRow,
      onRowClick,
      onRowEnter,
      onRowLeave,
      onRowOver,
      onRowOut,
      rowClassName,
      RowComponent,
      sortable,
      stripRows,
    };
  }, [
    className,
    bodyClassName,
    BodyComponent,
    filterable,
    fit,
    fixHeader,
    footer,
    footerClassName,
    FooterComponent,
    grow,
    header,
    headerClassName,
    HeaderComponent,
    height,
    highlightRow,
    onRowClick,
    onRowEnter,
    onRowLeave,
    onRowOver,
    onRowOut,
    rowClassName,
    RowComponent,
    sortable,
    stripRows,
  ]);

  return (
    <TableServiceContext.Provider value={controller.asService()}>
      <TableStateContext.Provider value={controller.state}>
        <TableConfigContext.Provider value={config}>
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
        </TableConfigContext.Provider>
      </TableStateContext.Provider>
    </TableServiceContext.Provider>
  );
};

ControllerTableComponent.displayName = 'Table';

export default ControllerTableComponent;
