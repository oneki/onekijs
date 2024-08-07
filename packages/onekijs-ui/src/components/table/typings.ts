import {
  Collection,
  CollectionBy,
  CollectionProxy,
  FormDisplayerProps,
  FormFieldProps,
  Item,
  ItemAdaptee,
  Primitive,
  QueryFilterCriteriaOperator,
  QueryFilterOrCriteria,
  QuerySortBy,
  UseCollectionOptions,
  ValidationStatus,
} from 'onekijs-framework';
import React, { ComponentType, FC, PropsWithChildren, ReactNode } from 'react';
import { StylableProps, TshirtSize } from '../../styles/typings';
import { CheckboxProps } from '../checkbox/typings';
import { FieldLayoutProps } from '../field/typings';
import { InputProps } from '../input/typings';
import { ListItemProps, ListItems, ListNotFoundProps, ListState, UseListOptions } from '../list/typings';
import { FormSelectProps, SelectBroker, SelectItem, SelectProps } from '../select/typings';
import { TextareaProps } from '../textarea/typings';
import TableService from './TableService';

export type ArrayTableProps<T = any, I extends TableItem<T> = TableItem<T>> = TableConfig<T, I> & {
  adapter?: TableItemAdapter<T>;
  columns?: TableColumn<T, I>[];
  dataSource?: string | T[] | (() => T[] | Promise<T[]>);
  fetchOnce?: boolean;
  selected?: T[];
};

export type ControllerTableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>,
> = TableConfig<T, I> & {
  controller: CollectionProxy<T, I, S, C>;
};

export type FormCellDisplayerProps = {
  Displayer: React.FC<FormDisplayerProps>;
  name: string;
  label?: string;
};

export type FormTableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>,
> = ControllerTableProps<T, I, S, C> &
  FormFieldProps &
  FieldLayoutProps & {
    addLabel?: string;
    format?: 'id' | 'object' | 'auto';
    defaultValue?: T[];
    FieldComponent?: React.FC<FormTableProps<T, I, S, C>>;
    value?: T[];
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: T[]) => void;
    status?: ValidationStatus;
    size?: TshirtSize;
    showAddButton?: boolean;
    ValueDisplayer?: React.FC<TableValueDisplayerProps<T>>;
  };

export type FormTableContext<T = any> = {
  tableName: string;
  onSelect: (item: TableItem<T>, selected: boolean) => void;
  onAdd: (initialValue: Partial<T> | undefined) => void;
  addLabel: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  editable?: boolean;   // if we add a element afterwards, it must be editable (if not, mark it as read only)
};

export type FormTableItemDisplayerProps<T = any> = {
  value: T;
  columns: TableColumn<T>[];
  first: boolean;
  last: boolean;
  className?: string;
  format: FormDisplayerProps['format'];
  name: string;
  index: number;
};

export type TableValueDisplayerProps<T = any> = {
  columns: TableColumn<T>[];
  value: T[];
  format: FormDisplayerProps['format'];
  name: string;
  className?: string;
};

export type TableBodyCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
  rowId?: string | number;
  rowIndex: number;
  item: I;
  data: T;
};

export type Cell<T = any, I extends TableItem<T> = TableItem<T>> = FC<TableBodyCellProps<T, I>>;

export type TableBodyProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
  items: (I | undefined)[];
  contentRef: React.RefObject<HTMLDivElement>;
  tableRef: React.RefObject<HTMLDivElement>;
};

export type TableBodyRowProps<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  ListItemProps<T, I>,
  'CellComponent'
> & {
  className?: string;
  CellComponent?: React.FC<Omit<TableBodyCellProps<T, I>, 'data'>>;
  columns: TableColumn<T, I>[];
  onExpand?: (item: I | undefined, index: number) => void;
  onExpanding?: (item: I | undefined, index: number) => void;
  onExpanded?: (item: I | undefined, index: number) => void;
  onCollapse?: (item: I | undefined, index: number) => void;
  onCollapsing?: (item: I | undefined, index: number) => void;
  onCollapsed?: (item: I | undefined, index: number) => void;
};

export type TableSerializerFormat = 'csv' | 'json'

export type TableConfig<T = any, I extends TableItem<T> = TableItem<T>> = {
  autoRefresh?: number;
  bodyClassName?: string;
  BodyComponent?: React.FC<TableBodyProps<T, I>>;
  className?: string;
  ExpandedComponent?: React.FC<TableExpandedProps<T, I>>;
  filterable?: boolean;
  fit?: boolean;
  fixHeader?: boolean;
  follow?: number;
  footer?: boolean;
  footerClassName?: string;
  FooterComponent?: React.FC<TableFooterProps<T, I>>;
  grow?: string;
  header?: boolean;
  headerClassName?: string;
  HeaderComponent?: React.FC<TableHeaderProps<T, I>>;
  height?: string | number;
  highlightRow?: boolean;
  increment?: number;
  itemHeight?: number | ((index: number) => number);
  LoadingComponent?: React.FC;
  LoadingRowComponent?: React.FC;
  NotFoundComponent?: React.FC<TableNotFoundProps> | null;
  onRowClick?: TableRowHandler<T, I>;
  onRowEnter?: TableRowHandler<T, I>;
  onRowLeave?: TableRowHandler<T, I>;
  onRowOver?: TableRowHandler<T, I>;
  onRowOut?: TableRowHandler<T, I>;
  paddingEnd?: number;
  paddingStart?: number;
  parentRef?: React.MutableRefObject<HTMLDivElement | null>;
  preload?: number;
  rowClassName?: string | ((item: I | undefined, rowIndex: number, columns: TableColumn<T, I>[]) => string);
  RowComponent?: React.FC<TableBodyRowProps<T, I>>;
  serializer?: (data: T[], format: TableSerializerFormat) => string;
  sortable?: boolean;
  stripRows?: boolean;
  tail?: boolean;
  ToolbarBottomComponent?: React.FC;
  ToolbarTopComponent?: React.FC;
  ToolbarBottomCenterComponent?: React.FC;
  ToolbarBottomLeftComponent?: React.FC;
  ToolbarBottomRightComponent?: React.FC;
  ToolbarTopCenterComponent?: React.FC;
  ToolbarTopLeftComponent?: React.FC;
  ToolbarTopRightComponent?: React.FC;
};

export type TableController<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
> = Collection<T, I, S> & {
  addColumn(column: TableColumn<T, I>, position?: number): void;
  addSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  columns: TableColumn<T, I>[];
  config?: TableConfig<T, I>;
  initCell(
    rowIndex: number | 'header-title' | 'header-filter' | 'footer',
    colId: string,
    ref: React.RefObject<HTMLDivElement>,
  ): void;
  removeColumn(id: string): void;
  removeSelected<B extends keyof CollectionBy<T, I>>(
    by: B,
    target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[];
  serialize: (data: T[], format: TableSerializerFormat) => string;
  setSelected<B extends keyof CollectionBy<T, I>>(by: B, target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][]): I[];
  startAutoRefresh: (interval: number) => void;
  stopAutoRefresh: () => void;
  toggle(item: I): void;
};

export type TableColumn<T, I extends TableItem<T> = TableItem<T>> = TableColumnSpec<T, I> & {
  computedWidth?: TableColumnComputedWidth;
};

export type TableCellDisplayerProps<T, I extends TableItem<T> = TableItem<T>> = {
  column: TableColumn<T, I>;
  rowIndex: number;
  colIndex: number;
  firstCol: boolean;
  lastCol: boolean;
  firstRow: boolean;
  lastRow: boolean;
  rowName: string;
  value: T;
  format: FormDisplayerProps['format'];
};

export type TableCellSerializer<T, I extends TableItem<T> = TableItem<T>> = (data: T, column: TableColumn<T, I>, format: TableSerializerFormat) => any;

export type TableColumnSpec<T, I extends TableItem<T> = TableItem<T>> = {
  className?: string | ((item: I, column: TableColumn<T, I>, rowIndex: number) => string);
  CellComponent?: Cell<T, I>;
  Displayer?: React.FC<TableCellDisplayerProps<T>>;
  ErrorBoundaryComponent?: ComponentType<PropsWithChildren<TableBodyCellProps<T, I>>>;
  footerClassName?: string | ((column: TableColumn<T, I>) => string);
  FooterComponent?: React.FC<TableFooterCellProps<T, I>>;
  filterable?: boolean;
  FilterComponent?: React.FC<TableHeaderCellProps<T, I>>;
  headerClassName?: string | ((column: TableColumn<T, I>) => string);
  help?: ReactNode;
  id: string;
  maxWidth?: string;
  minWidth?: string;
  serializer?: TableCellSerializer<T, I>;
  sortable?: boolean;
  title?: string;
  TitleComponent?: React.FC<TableHeaderCellProps<T, I>>;
  weight?: number;
  width?: string;
};

export type TableColumnWidth = {
  auto?: boolean;
  grow?: boolean;
  force?: boolean;
  unit?: 'px' | '%';
  value?: number;
};

export type TableColumnComputedWidth = {
  width?: string;
  minWidth?: string;
};

export type TableExpandedProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  item: I;
  rowId?: string | number;
  rowIndex: number;
};

export type TableFilterOperator = {
  not: boolean;
  operator: QueryFilterCriteriaOperator;
  text: string;
};

export type TableFilterOperatorProps = StylableProps & {
  onChange: (operator: TableFilterOperator) => void;
  operators: TableFilterOperator[];
  selected: TableFilterOperator;
};

export type TableFooterCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
};

export type TableFooterProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
};

export type TableHeaderCellProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  colIndex: number;
  column: TableColumn<T, I>;
  filter?: QueryFilterOrCriteria;
  filterable: boolean;
  sort?: QuerySortBy;
  sortable: boolean;
};

export type TableHeaderProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  className?: string;
  columns: TableColumn<T, I>[];
};

export type TableItem<T = any> = Item<T> & {
  expanded?: boolean;
};

export type TableItemAdaptee = ItemAdaptee;

export type TableItemAdapter<T = any> = (data: T) => TableItemAdaptee;

export type TableRowHandler<T = any, I extends TableItem<T> = TableItem<T>> = (item: I, index: number) => void;

export type TableItems<T = any> = ListItems<T>;

export type TableNotFoundProps = ListNotFoundProps;

export type TableProps<
  T = any,
  I extends TableItem<T> = TableItem<T>,
  S extends TableState<T, I> = TableState<T, I>,
  C extends TableController<T, I, S> = TableController<T, I, S>,
> = TableConfig<T, I> & {
  adapter?: TableItemAdapter<T>;
  controller?: CollectionProxy<T, I, S, C>;
  columns?: TableColumn<T, I>[];
  dataSource?: string | T[] | (() => T[] | Promise<T[]>);
  fetchOnce?: boolean;
  selected?: T[];
};

export type TableSortProps<T = any, I extends TableItem<T> = TableItem<T>> = {
  column: TableColumn<T, I>;
  sort?: QuerySortBy;
};

export type TableState<T = any, I extends TableItem<T> = TableItem<T>> = ListState<T, I> & {
  adapter?: TableItemAdapter<T>;
  columns: TableColumn<T, I>[];
  dataSource?: T[] | string;
  selected?: string[];
};

export type TableColumnsState<T = any, I extends TableItem<T> = TableItem<T>> = {
  columns: TableColumn<T, I>[];
};

export type CheckboxColumn<T = any, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I>;

export type InputColumn<T = any, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I>;

export type SelectColumn<
  T = any,
  F = any,
  I extends TableItem<T> = TableItem<T>,
  FI extends SelectItem<F> = SelectItem<F>,
> = TableColumn<T, I> & {
  broker: SelectBroker<F, FI>;
};

export type TextareaColumn<T = any, I extends TableItem<T> = TableItem<T>> = TableColumn<T, I>;

export type EnumColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<TableColumnSpec<T, I>, 'id'> & {
  filterDataSource: [Primitive, string][] | string[];
};

export type LinkColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent' | 'id'
> & {
  href: string | ((item: I) => string);
};

export type CheckboxColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent' | 'id'
> &
  Omit<FormFieldProps, 'name'> &
  Omit<CheckboxProps, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'defaultValue'> & {
    CellComponent?: (options: CheckboxColumnOptions<T, I>) => React.FC<TableBodyCellProps<T, I>>;
    defaultValue?: boolean;
  };

export type InputColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent' | 'id'
> &
  Omit<FormFieldProps, 'name'> &
  Omit<InputProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'> & {
    CellComponent?: (options: InputColumnOptions<T, I>) => React.FC<TableBodyCellProps<T, I>>;
  };

export type SelectColumnOptions<
  T = any,
  S = any,
  TI extends TableItem<T> = TableItem<T>,
  SI extends SelectItem<S> = SelectItem<S>,
> = Omit<TableColumnSpec<T, TI>, 'CellComponent' | 'id'> &
  Omit<SelectProps<S, SI>, 'className' | 'onFocus' | 'onChange' | 'onBlur' | 'items'> &
  Omit<FormFieldProps, 'name'> &
  UseCollectionOptions<S, SI> & {
    CellComponent?: SelectCell<T, S, TI, SI>;
  } & {
    Component?: React.FC<FormSelectProps<S, SI>>;
  };

export type TableColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<TableColumnSpec<T, I>, 'id'>;

export type TextareaColumnOptions<T = any, I extends TableItem<T> = TableItem<T>> = Omit<
  TableColumnSpec<T, I>,
  'CellComponent' | 'id'
> &
  Omit<FormFieldProps, 'name'> &
  Omit<TextareaProps, 'className' | 'onFocus' | 'onChange' | 'onBlur'> & {
    CellComponent?: (options: TextareaColumnOptions<T, I>) => React.FC<TableBodyCellProps<T, I>>;
  };

export type SelectCell<
  T = any,
  S = any,
  TI extends TableItem<T> = TableItem<T>,
  SI extends SelectItem<S> = SelectItem<S>,
> = (options: SelectColumnOptions<T, S, TI, SI>, broker: SelectBroker<S, SI>) => React.FC<TableBodyCellProps<T, TI>>;

export type UseTableOptions<T = any, I extends TableItem<T> = TableItem<T>> = UseListOptions<T, I> & {
  adapter?: TableItemAdapter<T>;
  selected?: T[];
};

export type UseTableController<T = any> = (
  dataSource: T[] | string | undefined,
  initialColumns: TableColumn<T, TableItem<T>>[] | undefined,
  options: UseTableOptions<T, TableItem<T>>,
) => CollectionProxy<
  T,
  TableItem<T>,
  TableState<T, TableItem<T>>,
  TableService<T, TableItem<T>, TableState<T, TableItem<T>>>
>;
