import { applyMixins, service } from 'onekijs-framework';
import TreeService from '../tree/TreeService';
import SelectService from './SelectService';
import { TreeSelectItem, TreeSelectState } from './typings';

@service
class TreeSelectService<
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
> extends SelectService<T, I, S> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TreeSelectService<
  T = any,
  I extends TreeSelectItem<T> = TreeSelectItem<T>,
  S extends TreeSelectState<T, I> = TreeSelectState<T, I>,
> extends TreeService<T, I, S> {}

applyMixins(TreeSelectService, [TreeService]);

export default TreeSelectService;
