import produce from 'immer';
import 'reflect-metadata';
import AppContext from '../app/AppContext';
import BasicError from './BasicError';
import GlobalService from './GlobalService';
import Service, { handler, run, serviceClass } from './Service';
import { AppService, Class, ID, ServiceFactory, State } from './typings';
import { isFunction } from './utils/type';

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

  createService<S extends State, T extends AppService<S>>(ctor: Class<T>, context: AppContext, initialState?: S): T {
    const instance = this.instanceRegistry[(ctor as any)[ID]];
    if (instance) {
      return instance;
    }
    const types = Reflect.getMetadata('design:paramtypes', ctor) || [];
    const args = types.map((type: any) => {
      if (!type[ID]) {
        throw new BasicError(`Cannot find a valid class for service ${type}`);
      }
      return this.instanceRegistry[type[ID]] || this.createService(type, context);
    });

    const ActualClass = this.getServiceClass(ctor);
    const service = new ActualClass(...args);
    service.context = context;

    if (service instanceof GlobalService) {
      service.state = produce(context.store.getState(), (draftState: S) => draftState) as any;
    } else {
      service.state = produce(initialState || {}, (draftState: S) => draftState) as any;
    }

    Object.getOwnPropertyNames(service).forEach((property) => {
      if (service[property] && service[property][serviceClass]) {
        const dependency = this.createService(service[property][serviceClass], context);
        (service as any)[property] = dependency;
      }
    });

    service[run]();

    if (isFunction(service.init)) {
      service.init();
    }

    const proxy = new Proxy(service, handler);
    if (service instanceof GlobalService) {
      this.instanceRegistry[(ctor as any)[ID]] = proxy;
    }
    return proxy as T;
  }
}
