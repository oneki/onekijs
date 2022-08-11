import { CollectionService, service } from 'onekijs-framework';
import { SelectController, SelectItem, SelectState } from './typings';

@service
class SelectService<T = any, I extends SelectItem<T> = SelectItem<T>, S extends SelectState<T, I> = SelectState<T, I>>
  extends CollectionService<T, I, S>
  implements SelectController<T, I> {}

export default SelectService;
