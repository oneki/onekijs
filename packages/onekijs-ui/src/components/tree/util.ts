import {
  AnonymousObject,
  applyFilter,
  applySearch,
  applySort,
  applySortBy,
  formatFilter,
  formatSortBy,
  LocalQuery,
  QuerySearcher,
  QuerySortComparator,
} from 'onekijs-framework';
import { TreeController, TreeItem } from './typings';

export const defaultTreeQueryEngine = <T = any, I extends TreeItem<T> = TreeItem<T>>(
  items: I[],
  query: LocalQuery,
  comparator: QuerySortComparator,
  comparators: AnonymousObject<QuerySortComparator>,
  searcher?: QuerySearcher<T>,
): I[] => {
  let result: I[] = [];
  if (!query.filter && !query.search) {
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
    if (query.filter || query.search) {
      const filter = formatFilter(query.filter);
      let hierarchy: I[] = [];
      let last: I | undefined;
      for (const item of items) {
        if (
          (query.filter && applyFilter(item, filter)) ||
          (query.search && applySearch(item, query.search, searcher))
        ) {
          result = result.concat(hierarchy);
          hierarchy = [];
          result.push(item);
          last = undefined;
        } else {
          if (last && last.level >= item.level) {
            hierarchy = hierarchy.filter((i) => i.level < item.level);
          }
          last = item;
          hierarchy.push(item);
        }
      }
    }
  }

  // apply sort
  if (query.sortBy) {
    result = applySortBy(result, formatSortBy(query.sortBy) || [], comparators);
  } else if (query.sort) {
    result = applySort(result, query.sort || 'asc', comparator);
  }

  return result;
};

export const isTreeItemExpanded = <T = any, I extends TreeItem<T> = TreeItem<T>>(
  item: I,
  service: TreeController<T, I>,
) => {
  if (item.collapsing) return false;
  if (service.isFiltered()) {
    return item.filterExpanded;
  }
  return item.expanded;
};
