import {
  clone,
  CollectionFetcherResult,
  CollectionService,
  defaultComparator,
  Query,
  reducer,
  saga,
  SagaEffect,
  service,
} from 'onekijs-framework';
import { SelectConfig, SelectController, SelectItem, SelectState } from './typings';
import { shouldCheckSelect } from './util';

@service
class SelectService<T = any, I extends SelectItem<T> = SelectItem<T>, S extends SelectState<T, I> = SelectState<T, I>>
  extends CollectionService<T, I, S>
  implements SelectController<T, I>
{
  public config: SelectConfig<T, I> = {};
  protected lastCheckQuery: Query | undefined;

  get defaultValue() {
    return this.config.defaultValue;
  }

  @saga(SagaEffect.Latest)
  *check() {
    const invalidItems: I[] = [];
    if (this.state.selected !== undefined && this.state.selected.length > 0) {
      let query = clone(this.getQuery());
      this._clearSearch(query);
      this._clearLimit(query);
      this._clearOffset(query);
      this.lastCheckQuery = query;

      for (const uid of this.state.selected) {
        if (!this.state.items || !this.state.items.find((i) => i?.uid === uid)) {
          const item = this.getItem(uid);
          if (item && item.text) {
            query = Object.assign({}, query, { search: item.text });
            if (this.state.local) {
              const queryEngine = this.state.queryEngine || this._execute.bind(this);
              const result = queryEngine(
                this.db || [],
                query,
                this.state.comparator || defaultComparator,
                this.state.comparators || {},
              );
              if (!result.find((i) => i.id === item.id)) {
                invalidItems.push(item);
              }
            } else {
              const oQuery = this.serializeQuery(query);
              const sQuery = Object.keys(oQuery)
                .map((k) => `${k}=${oQuery[k]}`)
                .join('&');
              let result: CollectionFetcherResult<T>;
              if (this.cache[sQuery]) {
                result = this.cache[sQuery];
              } else {
                const options = Object.assign({}, this.state.fetchOptions, { delayLoading: 0 });
                result = yield super._executeFetch(query, options, false);
              }
              const data: T[] = Array.isArray(result) ? result : result[this.state.dataKey];
              let invalid = true;
              for (const itemData of data) {
                const adaptee = this.adapt(itemData);
                if (adaptee.id === item.id) {
                  invalid = false;
                  break;
                }
              }
              if (invalid) {
                invalidItems.push(item);
              }
            }
          }
        }
      }
    }
    yield this._setInvalidItems(invalidItems);
  }

  @reducer
  setData(data: T[]): void {
    this.lastCheckQuery = undefined;
    super.setData(data);
  }

  setValue(value: null | T | T[]) {
    const onChange = this.config.onChange
    if (onChange) {
      onChange(value);
    }
  }

  @reducer
  setUrl(url: string) {
    this.lastCheckQuery = undefined;
    super.setUrl(url);
  }

  @reducer
  _setInvalidItems(invalidItems: I[]) {
    this.state.invalidItems = invalidItems;
  }

  protected _setItems(items: (I | undefined)[]): void {
    super._setItems(items);
    if (shouldCheckSelect(this.getQuery(), this.lastCheckQuery)) {
      this.callSaga('check');
    }
  }
}

export default SelectService;
