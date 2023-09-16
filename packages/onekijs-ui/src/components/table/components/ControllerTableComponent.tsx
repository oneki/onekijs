import React, { useEffect, useMemo, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableConfigContext } from '../hooks/useTableConfig';
import { TableServiceContext } from '../hooks/useTableService';
import { TableStateContext } from '../hooks/useTableState';
import { ControllerTableProps, TableConfig } from '../typings';
import TableBodyComponent from './TableBodyComponent';
import TableFooterComponent from './TableFooterComponent';
import TableHeaderComponent from './TableHeaderComponent';
import ExpandedCellComponent from './cells/ExpandedCellComponent';
import TableActionComponent from './TableActionComponent';

const ControllerTableComponent: React.FC<ControllerTableProps> = ({
  ActionComponent = TableActionComponent,
  autoRefresh,
  controller,
  className,
  bodyClassName,
  BodyComponent = TableBodyComponent,
  ExpandedComponent,
  filterable,
  fit,
  fixHeader = true,
  follow,
  grow,
  FooterComponent = TableFooterComponent,
  footerClassName,
  header = true,
  headerClassName,
  HeaderComponent = TableHeaderComponent,
  increment,
  LoadingComponent,
  LoadingRowComponent,
  NotFoundComponent,
  footer = false,
  height,
  highlightRow,
  onRowClick,
  onRowEnter,
  onRowLeave,
  onRowOver,
  onRowOut,
  paddingEnd,
  paddingStart,
  parentRef,
  preload,
  refreshButtonKind = 'primary',
  rowClassName,
  RowComponent,
  showRefreshButton,
  sortable,
  stripRows,
  tail,
}) => {
  const classNames = addClassname('o-table', className);
  const { columns, items } = controller.state;

  const contentRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const service = controller.asService();

  const config: TableConfig = useMemo(() => {
    return {
      ActionComponent,
      autoRefresh,
      bodyClassName,
      BodyComponent,
      className,
      ExpandedComponent,
      filterable,
      fit,
      fixHeader,
      follow,
      footer,
      footerClassName,
      FooterComponent,
      grow,
      header,
      headerClassName,
      HeaderComponent,
      height,
      highlightRow,
      increment,
      LoadingComponent,
      LoadingRowComponent,
      NotFoundComponent,
      onRowClick,
      onRowEnter,
      onRowLeave,
      onRowOver,
      onRowOut,
      paddingEnd,
      paddingStart,
      parentRef,
      preload,
      refreshButtonKind,
      rowClassName,
      RowComponent,
      showRefreshButton,
      sortable,
      stripRows,
      tail
    };
  }, [
    ActionComponent,
    autoRefresh,
    bodyClassName,
    BodyComponent,
    className,
    ExpandedComponent,
    filterable,
    fit,
    fixHeader,
    follow,
    footer,
    footerClassName,
    FooterComponent,
    grow,
    header,
    headerClassName,
    HeaderComponent,
    height,
    highlightRow,
    increment,
    LoadingComponent,
    LoadingRowComponent,
    NotFoundComponent,
    onRowClick,
    onRowEnter,
    onRowLeave,
    onRowOver,
    onRowOut,
    paddingEnd,
    paddingStart,
    parentRef,
    preload,
    refreshButtonKind,
    rowClassName,
    RowComponent,
    showRefreshButton,
    sortable,
    stripRows,
    tail,
  ]);

  service.config = config;

  useEffect(() => {
    if (ExpandedComponent) {
      const currentColumn = service.state.columns.find((c) => c.id === 'system.expander');
      if (!currentColumn) {
        service.addColumn(
          {
            id: 'system.expander',
            width: '45px',
            filterable: false,
            sortable: false,
            CellComponent: ExpandedCellComponent,
            className: 'o-table-cell-expander',
          },
          0,
        );
      }
    }
  }, [service, ExpandedComponent]);

  return (
    <TableServiceContext.Provider value={controller.asService()}>
      <TableStateContext.Provider value={controller.state}>
        <TableConfigContext.Provider value={config}>
          <div className={className}>
            <ActionComponent />
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
          </div>
        </TableConfigContext.Provider>
      </TableStateContext.Provider>
    </TableServiceContext.Provider>
  );
};

ControllerTableComponent.displayName = 'Table';

export default ControllerTableComponent;
