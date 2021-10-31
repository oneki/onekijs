import { service } from "onekijs";

@service
class TableService<
  T = any,
  M extends TreeItemMeta = TreeItemMeta,
  I extends TreeItem<T, M> = TreeItem<T, M>,
  S extends TreeState<T, M, I> = TreeState<T, M, I>
> extends CollectionService<T, M, I, S> implements TableController<T, M, I> {

  
  
}