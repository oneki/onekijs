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
  comparator: QuerySortComparator<T>,
  comparators: AnonymousObject<QuerySortComparator<T>>,
  searcher?: QuerySearcher<T>,
): I[] => {
  let result: I[] = [];
  let filteredItems: I[] = [];
  const filter = formatFilter(query.filter);
  let isFiltered = false;
  if (query.search !== undefined && query.search !== '') {
    isFiltered = true;
  }
  if (filter && filter.criterias.length > 0) {
    isFiltered = true;
  }

  if (isFiltered) {
    let hierarchy: I[] = [];
    for (const item of items) {
      hierarchy = hierarchy.filter((i) => i.level < item.level);
      if (
        item.selectable &&
        (!query.filter || applyFilter(item, filter)) &&
        (!query.search || applySearch(item, query.search, searcher))
      ) {
        filteredItems = filteredItems.concat(hierarchy);
        hierarchy = [];
        filteredItems.push(item);
      } else {
        hierarchy.push(item);
      }
    }
  } else {
    filteredItems = items;
  }

  // remove all children of non expanded items
  let visible = 1;
  filteredItems.forEach((item) => {
    if (item.level <= visible) {
      result.push(item);
      const expanded = isFiltered ? item.filterExpanded !== false : item.expanded;
      if (expanded) {
        visible = item.level + 1;
      } else {
        visible = item.level;
      }
    }
  });

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
): boolean => {
  if (item.collapsing) return false;
  if (service.isFiltered()) {
    return item.filterExpanded !== false;
  }
  return !!item.expanded;
};
