import {
  clone,
  CollectionService,
  defaultComparator,
  reducer,
  saga,
  SagaEffect,
  service,
  toArray,
} from 'onekijs-framework';
import { SelectController, SelectItem, SelectState } from './typings';

@service
class SelectService<T = any, I extends SelectItem<T> = SelectItem<T>, S extends SelectState<T, I> = SelectState<T, I>>
  extends CollectionService<T, I, S>
  implements SelectController<T, I>
{
  public value: T | T[] | undefined | null;

  @saga(SagaEffect.Latest)
  *check() {
    const invalidItems: I[] = [];

    if (this.value !== undefined && this.value !== null) {
      let query = clone(this.getQuery());
      this._clearSearch(query);
      this._clearLimit(query);
      this._clearOffset(query);

      for (const value of toArray(this.value)) {
        const adaptee = this._adapt(value, { doNotIndex: true });
        if (adaptee.text) {
          query = Object.assign({}, query, { search: adaptee.text });
          if (this.state.local) {
            const queryEngine = this.state.queryEngine || this._execute.bind(this);
            const result = queryEngine(
              this.db || [],
              query,
              this.state.comparator || defaultComparator,
              this.state.comparators || {},
            );
            if (!result.find((i) => i.id === adaptee.id)) {
              invalidItems.push(adaptee);
            }
          } else {
            yield this._fetch(query, false);
          }
        }
      }
    }
    this._setInvalidItems(invalidItems);
  }

  @reducer
  _setInvalidItems(invalidItems: I[]) {
    this.state.invalidItems = invalidItems;
  }
}

export default SelectService;
