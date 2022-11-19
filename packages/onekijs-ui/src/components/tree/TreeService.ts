import {
  AnonymousObject,
  asyncHttp,
  CollectionFetcherResult,
  CollectionService,
  ensureFieldValue,
  Fetcher,
  generateUniqueId,
  get,
  HttpMethod,
  isNull,
  LoadingStatus,
  LocalQuery,
  QuerySearcher,
  QuerySortComparator,
  reducer,
  saga,
  SagaEffect,
  service,
} from 'onekijs-framework';
import { Task } from 'redux-saga';
import { cancel, delay, fork } from 'redux-saga/effects';
import { TreeController, TreeItem, TreeItemAdaptee, TreeState } from './typings';
import { defaultTreeQueryEngine } from './util';

@service
class TreeService<T = any, I extends TreeItem<T> = TreeItem<T>, S extends TreeState<T, I> = TreeState<T, I>>
  extends CollectionService<T, I, S>
  implements TreeController<T, I>
{
  adapt(data: T | null | undefined): I {
    return this._adapt(data);
  }

  @reducer
  collapse(item: I): void {
    if (this.isFiltered()) {
      this.setMeta('item', item, 'filterExpanded', false);
      this._addFilterExpanded(item);
    } else {
      this.setMeta('item', item, 'expanded', false);
      if (this.state.expanded) {
        this.state.expanded = this.state.expanded.filter((uid) => uid !== item.uid);
        this.setParam('expanded', this.state.expanded);
      }
    }
    this.refresh();
  }

  @reducer
  collapsed(item: I): void {
    if (this.isFiltered()) {
      this.setMeta('item', item, 'filterExpanded', false);
      this._addFilterExpanded(item);
    } else {
      this.setMeta('item', item, 'expanded', false);
      if (this.state.expanded) {
        this.state.expanded = this.state.expanded.filter((uid) => uid !== item.uid);
        this.setParam('expanded', this.state.expanded);
      }
    }

    this.setMeta('item', item, 'collapsing', false);
    if (this.state.collapsing) {
      this.state.collapsing = this.state.collapsing.filter((uid) => uid !== item.uid);
      this.setParam('collapsing', this.state.collapsing);
    }
    this.refresh();
  }

  @reducer
  collapsing(item: I): void {
    this.setMeta('item', item, 'expanding', false);
    this.setMeta('item', item, 'collapsing', true);
    if (this.state.expanding) {
      this.state.expanding = this.state.expanding.filter((uid) => uid !== item.uid);
      this.setParam('expanding', this.state.expanding);
    }
    if (this.state.collapsing) {
      this.state.collapsing.push(item.uid);
    } else {
      this.state.collapsing = [item.uid];
    }
    this.setParam('collapsing', this.state.collapsing);
    this.refresh();
  }

  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *expand(item: I) {
    if (item.type === 'folder' && item.children === undefined) {
      yield this._fetchChildren(item, this._expand);
    } else {
      yield this._expand(item);
    }
  }

  @reducer
  expanded(item: I): void {
    this.setMeta('item', item, 'expanding', false);
    if (this.state.expanding) {
      this.state.expanding = this.state.expanding.filter((uid) => uid !== item.uid);
      this.setParam('expanding', this.state.expanding);
    }
    this.refresh();
  }

  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *expanding(item: I) {
    // check if the children are already loaded
    if (item.type === 'folder' && item.children === undefined) {
      yield this._fetchChildren(item, this._expanding);
    } else {
      yield this._expanding(item);
    }
  }

  initDb(dataSource: T[] | string | undefined): void {
    if (Array.isArray(dataSource)) {
      this._db = [];
      const context: AnonymousObject = {
        nextPosition: 0,
      };
      dataSource.forEach((entry) => {
        context.position = context.nextPosition;
        context.nextPosition = context.position + 1;
        context.level = 0;
        this._adapt(entry, context);
      });
      if (context.expanded) {
        this.state.expanded = context.expanded;
        this.state.params = this.state.params || {};
        this.state.params.expanded = context.expanded;
      }
    }
  }

  // getQuery(): Query {
  //   const query = super.getQuery();
  //   if (this.state.expanded && this.state.expanded.length > 0) {
  //     query.params = Object.assign({}, query.params, { expanded: this.state.expanded });
  //   }
  //   return query;
  // }

  _adapt(data: T | null | undefined, context?: AnonymousObject): I {
    if (context === undefined) {
      context = {
        level: 0,
      };
    }
    return super._adapt(data, context);
  }

  @reducer
  _addFilterExpanded(item: I): void {
    if (!this.state.filterExpanded) {
      this.state.filterExpanded = [item.uid];
    } else if (!this.state.filterExpanded.includes(item.uid)) {
      this.state.filterExpanded.push(item.uid);
    }
    this.setParam('filterExpanded', `${generateUniqueId()}`); // to force refresh and avoid cache
  }

  _buildItem(data: T | null | undefined, adaptee: unknown, context?: AnonymousObject): I {
    const hasContext = context !== undefined;
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
    const type = getType(c);
    ensureFieldValue(
      treeAdaptee,
      'type',
      get(data, 'folder') === false ? 'leaf' : get(data, 'folder') === true ? 'folder' : getType(c),
    );

    const level = context.level || 0;
    const position = context.position;

    const result = super._buildItem(data, treeAdaptee, context) as I;
    const children =
      treeAdaptee.children === undefined
        ? treeAdaptee.type === 'leaf'
          ? []
          : undefined
        : treeAdaptee.children.map((child) => {
            if (context !== undefined) {
              context.level = level + 1;
              context.position = context.nextPosition !== undefined ? context.nextPosition : undefined;
              context.nextPosition = context.position !== undefined ? context.position + 1 : undefined;
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
    ensureFieldValue(result, 'selectable', get(data, 'selectable', type === 'leaf'));
    ensureFieldValue(result, 'expanded', get(data, 'expanded', false));
    // ensureFieldValue(result, 'children', children);
    result.children = children;

    if (result.expanded && hasContext) {
      if (!context.expanded) {
        context.expanded = [result.uid];
      } else {
        context.expanded.push(result.uid);
      }
    }

    return result;
  }

  @reducer
  _clearFilterExpanded(): void {
    this.state.filterExpanded = [];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *_delayChildrenLoading(delay_ms: number, item: I) {
    yield delay(delay_ms);
    yield this.setMeta('item', item, 'loadingStatus', LoadingStatus.Loading);
  }

  _execute(
    items: I[],
    query: LocalQuery,
    comparator: QuerySortComparator,
    comparators: AnonymousObject<QuerySortComparator>,
    searcher?: QuerySearcher<T>,
  ): I[] {
    const result = defaultTreeQueryEngine(items, query, comparator, comparators, searcher);
    if (!this.isFiltered()) {
      if (this.state.filterExpanded) {
        this.state.filterExpanded.forEach((uid) => {
          this.setMeta('uid', uid, 'filterExpanded', undefined);
        });
        this._clearFilterExpanded();
      }
    }
    return result;
  }

  @reducer
  _expand(item: I): void {
    if (this._isFiltered(this.getQuery())) {
      this.setMeta('item', item, 'filterExpanded', true);
      this._addFilterExpanded(item);
    } else {
      this.setMeta('item', item, 'expanded', true);
      if (this.state.expanded) {
        this.state.expanded.push(item.uid);
      } else {
        this.state.expanded = [item.uid];
      }
      this.setParam('expanded', this.state.expanded);
    }
    this.refresh();
  }

  @reducer
  _expanding(item: I): void {
    const filtered = this._isFiltered(this.getQuery());

    this.setMeta('item', item, 'expanding', true);
    this.setMeta('item', item, 'collapsing', false);
    if (filtered) {
      this.setMeta('item', item, 'filterExpanded', true);
      this._addFilterExpanded(item);
    } else {
      this.setMeta('item', item, 'expanded', true);
      if (this.state.expanded) {
        this.state.expanded.push(item.uid);
      } else {
        this.state.expanded = [item.uid];
      }
      this.setParam('expanded', this.state.expanded);
    }

    if (this.state.expanding) {
      this.state.expanding.push(item.uid);
    } else {
      this.state.expanding = [item.uid];
    }
    this.setParam('expanding', this.state.expanding);
    if (this.state.collapsing) {
      this.state.collapsing = this.state.collapsing.filter((uid) => uid !== item.uid);
      this.setParam('collapsing', this.state.collapsing);
    }
    this.refresh();
  }

  @saga(SagaEffect.Every)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *_fetchChildren(item: I, callbackSuccess?: (item: I) => void, callbackError?: (item: I) => void) {
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
      if (this._cache[sQuery]) {
        result = this._cache[sQuery];
      } else {
        if (options.delayLoading) {
          yield this.setMeta('item', item, 'loadingStatus', LoadingStatus.Fetching);
          loadingTask = yield fork([this, this._delayChildrenLoading], options.delayLoading, item);
        } else {
          yield this.setMeta('item', item, 'loadingStatus', LoadingStatus.Loading);
        }

        const fetcher: Fetcher<CollectionFetcherResult<T>> = options.fetcher || asyncHttp;
        const method = this.state.method ?? HttpMethod.Get;
        const body = this.state.method === HttpMethod.Get ? undefined : Object.assign({}, query);

        const fetchOptions = method === HttpMethod.Get ? Object.assign({}, options, { query: oQuery }) : options;
        result = yield fetcher(this.url, method, body, fetchOptions);
        this._cache[sQuery] = result;
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
  _fetchChildrenError(e: any, item: I): void {
    this.state.error = e;
    this.setMeta('item', item, 'loadingStatus', LoadingStatus.Error);
  }

  @reducer
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _fetchChildrenSuccess(item: I, result: CollectionFetcherResult<T>): void {
    const children: T[] = Array.isArray(result) ? result : result[this.state.dataKey];
    const itemPosition = this._positionIndex[item.uid];
    const context = {
      position: 0,
      nextPosition: 1,
      level: item.level + 1,
    };

    let dbClone: I[] = [];

    if (this._db && itemPosition !== undefined) {
      // we need to make some place for the new items in the index
      dbClone = this._db.slice(parseInt(itemPosition) + 1);
      context.position = parseInt(itemPosition);
      context.nextPosition = context.position + 1;
    }

    const childrenItems = children.map((child) => {
      context.level = item.level + 1;
      context.position = context.nextPosition;
      context.nextPosition = context.position + 1;
      const adaptedChild = this._adapt(child, context);
      adaptedChild.parent = item.uid;
      return adaptedChild.uid;
    });

    let nextPosition = context.nextPosition;

    dbClone.forEach((toMove: I) => {
      if (this._db !== undefined) {
        this._db[nextPosition] = toMove;
        this._positionIndex[toMove.uid] = `${nextPosition}`;
        nextPosition++;
      }
    });
    this.setMeta('item', item, 'children', childrenItems);
    this.setMeta('item', item, 'loadingStatus', LoadingStatus.Loaded);
  }

  @reducer
  _removeFilterExpanded(item: I): void {
    if (this.state.filterExpanded) {
      this.state.filterExpanded = this.state.filterExpanded.filter((uid) => uid !== item.uid);
    }
  }
}

export default TreeService;
