import { AnyState, State, ServiceTypeEnum } from './typings';
import ServiceType from './ServiceType';
import Service from './Service';

export default class GlobalService<S extends State = AnyState> extends Service<S> {
  constructor() {
    super(new ServiceType(ServiceTypeEnum.Global));
  }
}
