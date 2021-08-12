import { collectionProxyProps, useObjectProxy } from 'onekijs-framework';
import GridService from './GridService';
import { GridController, GridItemMeta, GridState, UseGridOptions } from './typings';
import useGridService from './useGridService';
import useGridState from './useGridState';

export const gridCollectionProps = {
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

const useGrid = <T = any, M extends GridItemMeta = GridItemMeta>(
  options: UseGridOptions<T, M>,
): GridController<T, M> => {
  const gridState = useGridState<T, M>(options);
  const [, service] = useGridService<T, M, GridState<T, M>, GridService<T, M, GridState<T, M>>>(
    options.dataSource,
    GridService,
    gridState,
  );

  return useObjectProxy(service, gridCollectionProps);
};

export default useGrid;
