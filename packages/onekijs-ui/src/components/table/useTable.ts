import { collectionProxyProps, useObjectProxy } from 'onekijs-framework';
import TableService from './TableService';
import { TableController, TableItem, TableItemMeta, TableState, UseTableOptions } from './typings';
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

const useTable = <T = any, M extends TableItemMeta = TableItemMeta, I extends TableItem<T, M> = TableItem<T, M>>(
  options: UseTableOptions<T, M, I>,
): TableController<T, M, I> => {
  const tableState = useTableState<T, M, I>(options);
  const [, service] = useTableService<T, M, I, TableState<T, M, I>, TableService<T, M, I, TableState<T, M, I>>>(
    options.dataSource,
    TableService,
    tableState,
  );

  return useObjectProxy(service, tableCollectionProps);
};

export default useTable;
