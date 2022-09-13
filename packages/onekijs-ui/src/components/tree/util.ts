import { AnonymousObject, defaultQueryEngine, LocalQuery, QuerySearcher, QuerySortComparator } from 'onekijs-framework';
import { TreeItem } from './typings';

export const defaultTreeQueryEngine = <T = any, I extends TreeItem<T> = TreeItem<T>>(
  items: I[],
  query: LocalQuery,
  comparator: QuerySortComparator,
  comparators: AnonymousObject<QuerySortComparator>,
  searcher?: QuerySearcher<T>,
): I[] => {
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
  return defaultQueryEngine(result, query, comparator, comparators, searcher);
}
