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
  collpased(item: I): void {
    this.setMeta('item', item, 'expanded', false);
    this.setMeta('item', item, 'collapsing', false);
    if (this.state.expanded) {
      this.state.expanded = this.state.expanded.filter((uid) => uid !== item.uid);
      this.setParam('expanded', this.state.expanded.join(','));
    }
    if (this.state.collapsing) {
      this.state.collapsing = this.state.collapsing.filter((uid) => uid !== item.uid);
      this.setParam('collapsing', this.state.collapsing.join(','));
    }
    this.refresh();
  }

  @reducer
  collapsing(item: I): void {
    this.setMeta('item', item, 'expanding', false);
    this.setMeta('item', item, 'collapsing', true);
    if (this.state.expanding) {
      this.state.expanding = this.state.expanding.filter((uid) => uid !== item.uid);
      this.setParam('expanding', this.state.expanding.join(','));
    }
    if (this.state.collapsing) {
      this.state.collapsing.push(item.uid);
    } else {
      this.state.collapsing = [item.uid];
    }
    this.setParam('collapsing', this.state.collapsing.join(','));
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

  @reducer
  expanded(item: I): void {
    this.setMeta('item', item, 'expanding', false);
    if (this.state.expanding) {
      this.state.expanding = this.state.expanding.filter((uid) => uid !== item.uid);
      this.setParam('expanding', this.state.expanding.join(','));
    }
    this.refresh();
  }

  @reducer
  expanding(item: I): void {
    this.setMeta('item', item, 'expanded', true);
    this.setMeta('item', item, 'expanding', true);
    this.setMeta('item', item, 'collapsing', false);
    if (this.state.expanded) {
      this.state.expanded.push(item.uid);
    } else {
      this.state.expanded = [item.uid];
    }
    if (this.state.expanding) {
      this.state.expanding.push(item.uid);
    } else {
      this.state.expanding = [item.uid];
    }
    this.setParam('expanded', this.state.expanded.join(','));
    this.setParam('expanding', this.state.expanding.join(','));
    if (this.state.collapsing) {
      this.state.collapsing = this.state.collapsing.filter((uid) => uid !== item.uid);
      this.setParam('collapsing', this.state.collapsing.join(','));
    }
    this.refresh();
  }

  initDb(dataSource: T[] | string | undefined): void {
    if (Array.isArray(dataSource)) {
      this.db = [];
      const context: AnonymousObject = {
        nextPosition: 0,
      };
      dataSource.forEach((entry) => {
        context.position = context.nextPosition;
        context.nextPosition = context.position + 1;
        context.level = 0;
        this._adapt(entry, context);
      });
    }
    console.log(dataSource, this.db);
  }

  protected _adapt(data: T | undefined, context?: AnonymousObject): I {
    if (context === undefined) {
      context = {
        level: 0,
      };
    }
    return super._adapt(data, context);
  }

  protected _buildItem(currentItem: I, data: T | undefined, adaptee: unknown, context?: AnonymousObject): I {
    context = context || {};
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

    const level = context.level || 0;
    const position = context.position || 0;

    const result = super._buildItem(currentItem, data, treeAdaptee, context) as I;
    const children =
      treeAdaptee.children === undefined
        ? this.state.local
          ? []
          : undefined
        : treeAdaptee.children.map((child) => {
            if (context !== undefined) {
              context.level = level + 1;
              context.position = context.nextPosition;
              context.nextPosition = context.position + 1;
            }
            const adaptedChild = this._adapt(child, context);
            adaptedChild.parent = result.uid;
            return adaptedChild.uid;
          });

    // reset level
    if (context !== undefined) {
      context.level = level;
      context.position = position;
    }
    ensureFieldValue(result, 'level', level);
    // ensureFieldValue(result, 'children', children);
    result.children = children;

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
}

export default TreeService;
