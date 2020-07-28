import { AnyState, State, ServiceTypeEnum } from './typings';
import ServiceType from './ServiceType';
import Service from './Service';

export default class LocalService<S extends State = AnyState> extends Service<S> {
  constructor() {
    super(new ServiceType(ServiceTypeEnum.Local));
  }
}
