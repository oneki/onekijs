import React, { useEffect, useId, useMemo, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { TableConfigContext } from '../hooks/useTableConfig';
import { TableServiceContext } from '../hooks/useTableService';
import { TableStateContext } from '../hooks/useTableState';
import { ControllerTableProps, TableConfig } from '../typings';
import TableBodyComponent from './TableBodyComponent';
import TableFooterComponent from './TableFooterComponent';
import TableHeaderComponent from './TableHeaderComponent';
import ExpandedCellComponent from './cells/ExpandedCellComponent';
import TableToolbarBottomComponent from './TableToolbarBottomComponent';
import TableToolbarTopComponent from './TableToolbarTopComponent';

const ControllerTableComponent: React.FC<ControllerTableProps> = ({
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
  itemHeight,
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
  rowClassName,
  RowComponent,
  sortable,
  stripRows,
  tail,
  ToolbarBottomComponent = TableToolbarBottomComponent,
  ToolbarTopComponent = TableToolbarTopComponent,
  ToolbarBottomCenterComponent,
  ToolbarBottomLeftComponent,
  ToolbarBottomRightComponent,
  ToolbarTopCenterComponent,
  ToolbarTopLeftComponent,
  ToolbarTopRightComponent,
}) => {
  const classNames = addClassname('o-table', className);
  const { columns, items } = controller.state;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const service = controller.asService();

  const config: TableConfig = useMemo(() => {
    return {
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
      itemHeight,
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
      rowClassName,
      RowComponent,
      sortable,
      stripRows,
      tail,
      ToolbarBottomComponent,
      ToolbarTopComponent,
      ToolbarBottomCenterComponent,
      ToolbarBottomLeftComponent,
      ToolbarBottomRightComponent,
      ToolbarTopCenterComponent,
      ToolbarTopLeftComponent,
      ToolbarTopRightComponent,
    };
  }, [
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
    itemHeight,
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
    rowClassName,
    RowComponent,
    sortable,
    stripRows,
    tail,
    ToolbarBottomComponent,
    ToolbarTopComponent,
    ToolbarBottomCenterComponent,
    ToolbarBottomLeftComponent,
    ToolbarBottomRightComponent,
    ToolbarTopCenterComponent,
    ToolbarTopLeftComponent,
    ToolbarTopRightComponent,
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

  const id = useId();

  return (
    <TableServiceContext.Provider value={controller.asService()}>
      <TableStateContext.Provider value={controller.state}>
        <TableConfigContext.Provider value={config}>
          <div className={className}>
            <ToolbarTopComponent />
            <div
              id={id}
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
          <ToolbarBottomComponent />
        </TableConfigContext.Provider>
      </TableStateContext.Provider>
    </TableServiceContext.Provider>
  );
};

ControllerTableComponent.displayName = 'Table';

export default ControllerTableComponent;
