import {
  AnonymousObject,
  CollectionService,
  ensureFieldValue,
  isNull,
  LocalQuery,
  QuerySortComparator,
  reducer,
  service,
} from 'onekijs-framework';
import { TreeController, TreeItem, TreeItemAdaptee, TreeState } from './typings';

@service
class TreeService<T = any, I extends TreeItem<T> = TreeItem<T>, S extends TreeState<T, I> = TreeState<T, I>>
  extends CollectionService<T, I, S>
  implements TreeController<T, I> {
  adapt(data: T | undefined): I {
    return this._adapt(data);
  }

  @reducer
  collapse(item: I): void {
    this.setMeta('item', item, 'expanded', false);
    if (this.state.expanded) {
      this.state.expanded = this.state.expanded.filter((uid) => uid !== item.uid);
      this.setParam('expanded', this.state.expanded.join(','));
    }
    this.refresh();
  }

  @reducer
  expand(item: I): void {
    this.setMeta('item', item, 'expanded', true);
    if (this.state.expanded) {
      this.state.expanded.push(item.uid);
    } else {
      this.state.expanded = [item.uid];
    }
    this.setParam('expanded', this.state.expanded.join(','));
    this.refresh();
  }

  initDb(dataSource: T[] | string | undefined): void {
    if (Array.isArray(dataSource)) {
      this.db = [];
      const context = {
        position: -1,
        level: 0,
      };
      dataSource.forEach((entry) => {
        context.position += 1;
        context.level = 0;
        this._adapt(entry, context);
      });
    }
  }

  protected _adapt(data: T | undefined, context?: { position?: number; level: number }): I {
    if (context === undefined) {
      context = {
        level: 0,
      };
    }
    return super._adapt(data, context);
  }

  protected _buildItem(
    currentItem: I,
    data: T | undefined,
    adaptee: unknown,
    context?: { position?: number; level: number },
  ): I {
    const getChildren = (data: any): T[] | undefined => {
      if (isNull(data)) {
        return undefined;
      }
      if (!isNull(data.children)) {
        return data.children;
      } else {
        return undefined;
      }
    };
    const getIcon = (data: any): string | undefined => {
      if (isNull(data)) {
        return undefined;
      }
      if (!isNull(data.icon)) {
        return String(data.icon);
      } else {
        return undefined;
      }
    };

    const treeAdaptee = adaptee as TreeItemAdaptee<T>;
    ensureFieldValue(treeAdaptee, 'children', getChildren(data));
    ensureFieldValue(treeAdaptee, 'icon', getIcon(data));

    const level = context?.level || 0;

    const result = super._buildItem(currentItem, data, treeAdaptee, context) as I;
    const children =
      treeAdaptee.children === undefined
        ? this.state.local
          ? []
          : undefined
        : treeAdaptee.children.map((child) => {
            if (context !== undefined) {
              if (context.position !== undefined) {
                context.position += 1;
              }
              context.level = level + 1;
            } else {
              context = { level: 1 };
            }
            const adaptedChild = this._adapt(child, context);
            adaptedChild.parent = result.uid;
            return adaptedChild.uid;
          });

    ensureFieldValue(result, 'level', level);
    ensureFieldValue(result, 'children', children);

    return result;
  }

  protected _execute(
    items: I[],
    query: LocalQuery,
    comparator: QuerySortComparator,
    comparators: AnonymousObject<QuerySortComparator>,
  ): I[] {
    let result: I[] = [];
    if (!query.filter) {
      // remove all children of non expanded items
      let visible = 1;
      items.forEach((item) => {
        if (item.level <= visible) {
          result.push(item);
          if (item.expanded) {
            visible = item.level + 1;
          } else {
            visible = item.level;
          }
        }
      });
    } else {
      result = items;
    }
    return super._execute(result, query, comparator, comparators);
  }

  protected _indexItem(item: I, position?: number): void {
    this.uidIndex[item.uid] = item;
    if (item.id !== undefined) {
      this.idIndex[item.id] = item;
    }
    if (position !== undefined) {
      this.positionIndex[item.uid] = position;
    }
    if (this.positionIndex[item.uid] !== undefined && this.db) {
      this.db[this.positionIndex[item.uid]] = item;
    }
  }
}

export default TreeService;
