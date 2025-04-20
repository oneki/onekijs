import {
  AnonymousObject,
  clone,
  CollectionFetcherResult,
  CollectionService,
  defaultComparator,
  ensureFieldValue,
  isNull,
  LoadingStatus,
  Query,
  reducer,
  saga,
  SagaEffect,
  service,
  toArray,
} from 'onekijs-framework';
import { all, call } from 'redux-saga/effects';
import { SelectConfig, SelectGroup, SelectItem, SelectItemAdaptee, SelectState } from './typings';
import { shouldCheckSelect } from './util';

@service
class SelectService<
  T = any,
  I extends SelectItem<T> = SelectItem<T>,
  S extends SelectState<T, I> = SelectState<T, I>,
> extends CollectionService<T, I, S> {
  public config: SelectConfig<T, I> | undefined;
  protected lastCheckQuery: Query | undefined;

  get defaultValue() {
    return this.state.defaultValue ?? this.config?.defaultValue;
  }

  get defaultValueLoading() {
    return this.state.defaultValueLoading ?? this.config?.defaultValueLoading;
  }

  @saga(SagaEffect.Serial)
  *check() {
    if (!this.config?.validateValue) return;
    if (this.defaultValueLoading || (this.state.local && this.status !== LoadingStatus.Loaded)) {
      return; // this validation will be done when the data will be loaded (can be delayed due to a fetchOnce)
    }



    let invalidItems: I[] = [];
    const defaultItems: I[] = this.defaultValue ? toArray(this.defaultValue).map((v) => this._adapt(v)) : [];

    const query = clone(this.getQuery());
    this._clearSearch(query);
    this._clearLimit(query);
    this._clearOffset(query);
    this.lastCheckQuery = query;

    const filterDefaultItems: (I | undefined)[] = yield all(
      defaultItems.map((i) => call([this, this._filterItem], i, query, true)),
    );

    const validDefaultValue = (filterDefaultItems.filter((i) => i !== undefined && i.data !== undefined) as I[]).map(
      (i) => i.data,
    ) as T[];

    const multiple = this.config && this.config.multiple ? this.config.multiple : false;

    if (multiple) {
      yield this._setValidDefaultValue(validDefaultValue);
    } else if (validDefaultValue.length > 0) {
      yield this._setValidDefaultValue(validDefaultValue[0]);
    } else {
      yield this._setValidDefaultValue(
        this.config === undefined || this.config.nullable || !this.state.items
          ? null
          : this.config.defaultValue === undefined ||
            this.config.defaultValue === null ||
            this.state.defaultValue === null
          ? this.state.items[0]?.data === undefined
            ? null
            : this.state.items[0].data
          : null,
      );
    }

    if (this.state.selected !== undefined) {
      const item = this.getItem(this.state.selected[0]);
      const filterItems: (I | undefined)[] = yield all([this._filterItem(item, query, false)]);
      invalidItems = filterItems.filter((i) => i !== undefined) as I[];
    }

    yield call(this._setInvalidItems, invalidItems);
  }

  @reducer
  setData(data: T[], query?: Query): void {
    this.lastCheckQuery = undefined;
    super.setData(data, query);
  }

  @saga(SagaEffect.Latest)
  *setDefaultValue(value: T | T[] | null | undefined) {
    yield this._setDefaultValue(value);
    yield this.check(); // validate the default value
    if (
      value !== undefined &&
      this.state.validDefaultValue &&
      (!this.config?.value || (Array.isArray(this.config.value) && this.config.value.length === 0))
    ) {
      yield this.setValue(value);
    }
  }

  @reducer
  setDefaultValueLoading(loading: boolean): void {
    this.state.defaultValueLoading = loading;
  }

  @reducer
  setItemWidth(_item: I, value: number) {
    if (
      this.config?.dropdownWidthModifier === 'min' &&
      (this.state.width === undefined || value + 30 > this.state.width)
    ) {
      this.state.width = value + 30;
    }
  }

  setValue(value: null | T | T[]) {
    const onChange = this.config?.onChange;
    if (onChange) {
      onChange(value);
    }
  }

  @reducer
  setUrl(url: string, query?: Query) {
    this.lastCheckQuery = undefined;
    super.setUrl(url, query);
  }

  _buildItem(data: T | null | undefined, adaptee: unknown, context?: AnonymousObject): I {
    context = context || {};

    const getGroup = (data: any): SelectGroup | undefined => {
      if (isNull(data)) {
        return undefined;
      }
      if (!isNull(data.group)) {
        return data.group;
      } else {
        return undefined;
      }
    };

    const selectAdaptee = adaptee as SelectItemAdaptee;
    ensureFieldValue(selectAdaptee, 'group', getGroup(data));

    return super._buildItem(data, selectAdaptee, context) as I;
  }

  *_filterItem(item: I | undefined, query: Query, valid: boolean) {
    if (item === undefined) return item;
    let isValid = false;
    if (!this.state.items || !this.state.items.find((i) => i?.uid === item.uid)) {
      query = Object.assign({}, query, { search: item.text });
      const local = this.state.fetchOnce ? this.status === LoadingStatus.Loaded : this.state.local;

      if (local) {
        const queryEngine = this.state.queryEngine || this._execute.bind(this);
        const result: I[] = yield queryEngine(
          this._db || [],
          query,
          this.state.comparator || defaultComparator,
          this.state.comparators || {},
        );
        isValid = !!result.find((i) => this._compareItem(i, item));
      } else {
        const oQuery = this.serializeQuery(query);
        const sQuery = Object.keys(oQuery)
          .map((k) => `${k}=${oQuery[k]}`)
          .join('&');
        let result: CollectionFetcherResult<T>;
        if (this._cache[sQuery]) {
          result = this._cache[sQuery];
        } else {
          const options = Object.assign({}, this.state.fetchOptions, { delayLoading: 0 });
          result = yield super._executeFetch(query, options, false);
        }
        const data: T[] = Array.isArray(result) ? result : result[this.state.dataKey];
        for (const itemData of data) {
          const adaptee = this.adapt(itemData);
          if (this._compareItem(adaptee, item)) {
            isValid = true;
            break;
          }
        }
      }
    } else {
      isValid = true;
    }

    return valid === isValid ? item : undefined;
  }

  _compareItem(a: I | undefined, b: I | undefined): boolean {
    if (a === undefined || b === undefined) {
      return a === b;
    }
    return a.id === b.id;
  }

  @reducer
  _setDefaultValue(value: T | T[] | null | undefined) {
    this.state.defaultValueLoading = false;
    this.state.defaultValue = value;
  }

  @reducer
  _setValidDefaultValue(value: T | T[] | null) {
    this.state.validDefaultValue = value;
  }

  @reducer
  _setInvalidItems(invalidItems: I[]) {
    this.state.invalidItems = invalidItems;
  }

  _setItems(items: (I | undefined)[]): void {
    super._setItems(items);
    if (shouldCheckSelect(this.getQuery(), this.lastCheckQuery)) {
      this.callSaga('check');
    }
  }
}

export default SelectService;
