import { ID, ServiceTypeEnum, SERVICE_TYPE_ID } from './typings';

export default class ServiceType {
  type: ServiceTypeEnum;
  static [ID] = SERVICE_TYPE_ID;
  constructor(type: ServiceTypeEnum) {
    this.type = type;
  }
  isGlobal(): boolean {
    return this.type === ServiceTypeEnum.Global;
  }
  isLocal(): boolean {
    return this.type === ServiceTypeEnum.Local;
  }
}
