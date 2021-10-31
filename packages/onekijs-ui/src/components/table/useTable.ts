import { collectionProxyProps, useObjectProxy } from 'onekijs-framework';
import TableService from './TableService';
import { TableController, TableItem, TableState, UseTableOptions } from './typings';
import useTableService from './useTableService';
import useTableState from './useTableState';

export const tableCollectionProps = {
  pick: collectionProxyProps.pick.concat([
    'addColumn',
    'addSelected',
    'bodyClassName',
    'BodyComponent',
    'bodyWidth',
    'filterable',
    'fit',
    'fixHeader',
    'footerClassName',
    'grow',
    'headerClassName',
    'highlightRow',
    'height',
    'initCell',
    'onMount',
    'onRowClick',
    'onRowEnter',
    'onRowLeave',
    'onRowOver',
    'onRowOut',
    'removeColumn',
    'removeSelected',
    'rowClassName',
    'RowComponent',
    'setFooter',
    'setFooterCompent',
    'setHeader',
    'setHeaderComponent',
    'setSelected',
    'sortable',
    'stripRows',
  ]),
  mutables: collectionProxyProps.mutables.concat([
    'columns',
    'footer',
    'FooterComponent',
    'header',
    'headerComponent',
    'selected',
    'step',
  ]),
};

const useTable = <T, I extends TableItem<T> = TableItem<T>>(options: UseTableOptions<T, I>): TableController<T, I> => {
  const tableState = useTableState<T, I>(options);
  const [, service] = useTableService<T, I, TableState<T, I>, TableService<T, I, TableState<T, I>>>(
    options.dataSource,
    TableService,
    tableState,
  );

  return useObjectProxy(service, tableCollectionProps);
};

export default useTable;
