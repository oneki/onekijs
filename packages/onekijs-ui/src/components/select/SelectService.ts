import {
  clone,
  CollectionService,
  defaultComparator,
  Query,
  reducer,
  saga,
  SagaEffect,
  service
} from 'onekijs-framework';
import { SelectController, SelectItem, SelectState } from './typings';
import { shouldCheckSelect } from './util';

@service
class SelectService<T = any, I extends SelectItem<T> = SelectItem<T>, S extends SelectState<T, I> = SelectState<T, I>>
  extends CollectionService<T, I, S>
  implements SelectController<T, I>
{
  protected lastCheckQuery: Query | undefined

  @saga(SagaEffect.Latest)
  *check() {
    const invalidItems: I[] = [];
    console.log(this.state.selected);
    if (this.state.selected !== undefined && this.state.selected.length > 0) {
      let query = clone(this.getQuery());
      this._clearSearch(query);
      this._clearLimit(query);
      this._clearOffset(query);
      this.lastCheckQuery = query;

      for (const uid of this.state.selected) {
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
