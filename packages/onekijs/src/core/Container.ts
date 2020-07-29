import produce from 'immer';
import Service, { run, serviceClass, types, dispatch } from './Service';
import { Class, ID, State, ServiceFactory, SERVICE_TYPE_ID, ServiceTypeEnum } from './typings';
import { isFunction } from './utils/type';
import { toPayload } from './utils/object';
import ServiceType from './ServiceType';
import BasicError from './BasicError';
import AppContext from '../app/AppContext';

export const handler = {
  get: function <S extends State, T extends Service<S>>(target: T, prop: string | number | symbol, receiver?: T): any {
    const alias = target[types][prop];
    if (alias) {
      if (alias.type === 'reducer') {
        return function (...args: any[]) {
          target[dispatch]({
            type: alias.actionType,
            payload: toPayload(args),
          });
        };
      } else if (alias.type === 'saga') {
        return function (...args: any[]) {
          return new Promise((resolve, reject) => {
            target[dispatch]({
              type: alias.actionType,
              payload: toPayload(args),
              resolve,
              reject,
            });
          });
        };
      }
    } else {
      return Reflect.get(target, prop, receiver);
    }
  },
};

export default class Container implements ServiceFactory {
  private classRegistry: {
    [k: string]: any;
  };

  private instanceRegistry: {
    [k: string]: any;
  };

  constructor() {
    this.classRegistry = {};
    this.instanceRegistry = {};
  }

  addServiceClass<S extends State, T extends Service<S>>(ctor: Class<T>, force = true): void {
    const label = (ctor as any)[ID];
    if (force || this.classRegistry[label] === undefined) {
      this.classRegistry[label] = ctor;
    }
  }

  getServiceClass<S extends State, T extends Service<S>>(ctor: Class<T>): Class<T> {
    return this.classRegistry[(ctor as any)[ID]] || ctor;
  }

  createService<S extends State, T extends Service<S>>(
    serviceType: ServiceType,
    ctor: Class<T>,
    context: AppContext,
    initialState?: S,
  ): T {
    const instance = this.instanceRegistry[(ctor as any)[ID]];
    if (instance) {
      return instance;
    }
    const types = Reflect.getMetadata('design:paramtypes', ctor) || [];
    const args = types.map((type: any) => {
      if (!type[ID]) {
        throw new BasicError(`Cannot find a valid class for service ${type}`);
      }
      if (type[ID] === SERVICE_TYPE_ID) {
        return serviceType;
      } else {
        return (
          this.instanceRegistry[type[ID]] || this.createService(new ServiceType(ServiceTypeEnum.Global), type, context)
        );
      }
    });

    const ActualClass = this.getServiceClass(ctor);
    const service = new ActualClass(...args);
    service.context = context;

    if (serviceType.isGlobal()) {
      service.state = produce(context.store.getState(), (draftState: S) => draftState) as any;
    } else {
      service.state = produce(initialState || {}, (draftState: S) => draftState) as any;
    }

    Object.getOwnPropertyNames(service).forEach((property) => {
      if (service[property] && service[property][serviceClass]) {
        const dependency = this.createService(
          new ServiceType(ServiceTypeEnum.Global),
          service[property][serviceClass],
          context,
        );
        (service as any)[property] = dependency;
      }
    });

    service[run]();

    if (isFunction(service.init)) {
      service.init();
    }

    const proxy = new Proxy(service, handler);
    if (serviceType.isGlobal()) {
      this.instanceRegistry[(ctor as any)[ID]] = proxy;
    }
    return proxy as T;
  }
}
