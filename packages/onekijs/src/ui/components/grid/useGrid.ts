import { collectionProxyProps } from '../../../collection/useCollection';
import useObjectProxy from '../../../core/useObjectProxy';
import GridService from './GridService';
import { GridController, GridItemMeta, GridState, UseGridOptions } from './typings';
import useGridService from './useGridService';
import useGridState from './useGridState';

export const gridCollectionProps = {
  pick: collectionProxyProps.pick.concat([
    'bodyClassName',
    'BodyComponent',
    'bodyWidth',
    'filterable',
    'fit',
    'fixHeader',
    'grow',
    'headerClassName',
    'HeaderComponent',
    'height',
    'rowClassName',
    'RowComponent',
    'asService',
    'initCell',
    'onMount',
    'onRowClick',
    'onRowEnter',
    'onRowLeave',
    'onRowOver',
    'onRowOut',
    'sortable',
  ]),
  mutables: collectionProxyProps.mutables.concat(['columns', 'step']),
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
