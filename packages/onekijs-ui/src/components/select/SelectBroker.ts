import { DefaultCollectionBroker } from 'onekijs-framework';
import { SelectBroker, SelectController, SelectItem, SelectState } from './typings';

export default class DefaultSelectBroker<
    T = any,
    I extends SelectItem<T> = SelectItem<T>,
    S extends SelectState<T, I> = SelectState<T, I>,
    C extends SelectController<T, I, S> = SelectController<T, I, S>,
  >
  extends DefaultCollectionBroker<T, I, S, C>
  implements SelectBroker<T, I, S, C>
{
  protected defaultValue: T | T[] | null | undefined;

  setDefaultValue(defaultValue: T | T[] | null | undefined, subscriberId?: string): void {
    if (subscriberId === undefined) {
      this.defaultValue = defaultValue;
    }
    this._getSubscribers(subscriberId).forEach((s) => s.setDefaultValue(defaultValue));
  }
}
