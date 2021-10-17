import { collectionProxyProps, useObjectProxy } from 'onekijs-framework';
import TableService from './TableService';
import { TableController, TableItemMeta, TableState, UseTableOptions } from './typings';
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

const useTable = <T = any, M extends TableItemMeta = TableItemMeta>(
  options: UseTableOptions<T, M>,
): TableController<T, M> => {
  const tableState = useTableState<T, M>(options);
  const [, service] = useTableService<T, M, TableState<T, M>, TableService<T, M, TableState<T, M>>>(
    options.dataSource,
    TableService,
    tableState,
  );

  return useObjectProxy(service, tableCollectionProps);
};

export default useTable;
