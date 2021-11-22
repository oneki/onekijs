import { CollectionBy, CollectionService, ensureFieldValue, get, service } from 'onekijs-framework';
import { TreeController, TreeItem, TreeItemAdaptee, TreeState } from './typings';

@service
class TreeService<T = any, I extends TreeItem<T> = TreeItem<T>, S extends TreeState<T, I> = TreeState<T, I>>
  extends CollectionService<T, I, S>
  implements TreeController<T, I> {
  addSelected<B extends keyof CollectionBy<T, I>>(
    _by: B,
    _target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    throw new Error('Method not implemented.');
  }
  removeSelected<B extends keyof CollectionBy<T, I>>(
    _by: B,
    _target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    throw new Error('Method not implemented.');
  }
  setSelected<B extends keyof CollectionBy<T, I>>(
    _by: B,
    _target: CollectionBy<T, I>[B] | CollectionBy<T, I>[B][],
  ): I[] {
    throw new Error('Method not implemented.');
  }

  protected _formatItem(data: T | undefined, adaptee: unknown): I {
    const treeAdaptee = adaptee as TreeItemAdaptee<T>;
    const item = super._formatItem(data, adaptee);
    const children =
      treeAdaptee.children === undefined ? undefined : treeAdaptee.children.map((child) => this.adapt(child));

    ensureFieldValue(item, 'children', children);
    ensureFieldValue(item, 'icon', get(adaptee, 'icon'));

    return item;
  }
}

export default TreeService;
