import {
  AnonymousObject,
  asyncHttp,
  CollectionFetcherResult,
  CollectionService,
  ensureFieldValue,
  Fetcher,
  HttpMethod,
  isNull,
  LoadingStatus,
  LocalQuery,
  Query,
  QuerySortComparator,
  reducer,
  saga,
  SagaEffect,
  service,
} from 'onekijs-framework';
import { Task } from 'redux-saga';
import { cancel, delay, fork } from 'redux-saga/effects';
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
    // check if the children are already loaded
    if (item.type === 'folder' && item.children === undefined) {
      this._fetchChildren(item, this.expanded);
    } else {
      this.setMeta('item', item, 'expanding', false);
      if (this.state.expanding) {
        this.state.expanding = this.state.expanding.filter((uid) => uid !== item.uid);
        this.setParam('expanding', this.state.expanding.join(','));
      }
      this.refresh();
    }
  }

  @reducer
  expanding(item: I): void {
    // check if the children are already loaded
    if (item.type === 'folder' && item.children === undefined) {
      this._fetchChildren(item, this.expanding);
    } else {
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

    const getType = (children: T[] | undefined): 'leaf' | 'folder' => {
      if (children === undefined || children.length > 0) {
        return 'folder';
      }
      return 'leaf';
    };

    const treeAdaptee = adaptee as TreeItemAdaptee<T>;
    const c = getChildren(data);
    ensureFieldValue(treeAdaptee, 'children', c);
    ensureFieldValue(treeAdaptee, 'icon', getIcon(data));
    ensureFieldValue(treeAdaptee, 'type', getType(c));

    const level = context.level || 0;
    const position = context.position || 0;

    const result = super._buildItem(currentItem, data, treeAdaptee, context) as I;
    const children =
      treeAdaptee.children === undefined
        ? treeAdaptee.type === 'leaf'
          ? []
          : undefined
        : treeAdaptee.children.map((child) => {
            if (context !== undefined) {
              context.level = level + 1;
              context.position = context.nextPosition;
              context.nextPosition = context.position + 1;
            } else {
              context = {
                level,
              };
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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected *_delayChildrenLoading(delay_ms: number, item: I) {
    yield delay(delay_ms);
    yield this.setMeta('item', item, 'loadingStatus', LoadingStatus.Loading);
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

  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected *_fetchChildren(item: I, callbackSuccess?: (item: I) => void, callbackError?: (item: I) => void) {
    let loadingTask: Task | null = null;
    const options = this.state.fetchOptions || {};
    const query = this.getQuery();

    try {
      query.params = Object.assign({}, query.params, { parent: item.id });
      const oQuery = this.serializeQuery(query);
      const sQuery = Object.keys(oQuery)
        .map((k) => `${k}=${oQuery[k]}`)
        .join('&');
      let result: CollectionFetcherResult<T>;
      if (this.cache[sQuery]) {
        result = this.cache[sQuery];
      } else {
        if (options.delayLoading) {
          yield this.setMeta('item', item, 'loadingStatus', LoadingStatus.Fetching);
          loadingTask = yield fork([this, this._delayChildrenLoading], options.delayLoading, item);
        } else {
          yield this.setMeta('item', item, 'loadingStatus', LoadingStatus.Loading);
        }
        const fetcher: Fetcher<CollectionFetcherResult<T>, T | Query | undefined> = options.fetcher || asyncHttp;
        const method = this.state.method ?? HttpMethod.Get;
        const body = this.state.method === HttpMethod.Get ? undefined : Object.assign({}, query);

        const fetchOptions = method === HttpMethod.Get ? Object.assign({}, options, { query: oQuery }) : options;
        result = yield fetcher(this.url, method, body, fetchOptions);
        this.cache[sQuery] = result;
        if (loadingTask !== null) {
          yield cancel(loadingTask);
        }
      }
      yield this._fetchChildrenSuccess(item, result); // to update the store and trigger a re-render.
      if (callbackSuccess) {
        yield callbackSuccess(item);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Fetch error', e);
      }
      if (loadingTask !== null) {
        yield cancel(loadingTask);
      }
      yield this._fetchError(e, query);

      if (callbackError) {
        yield callbackError(item);
      } else {
        throw e;
      }
    }
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _fetchChildrenError(e: any, item: I): void {
    this.state.error = e;
    this.setMeta('item', item, 'loadingStatus', LoadingStatus.Error);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _fetchChildrenSuccess(item: I, result: CollectionFetcherResult<T>): void {
    const children: T[] = Array.isArray(result) ? result : result[this.state.dataKey];
    this.setMeta(
      'item',
      item,
      'children',
      children.map((child) => {
        const context = {
          level: item.level + 1,
        };
        const adaptedChild = this._adapt(child, context);
        adaptedChild.parent = item.uid;
        return adaptedChild.uid;
      }),
    );

    this.setMeta('item', item, 'loadingStatus', LoadingStatus.Loaded);
  }
}

export default TreeService;
