import 'reflect-metadata';
import AppContext from '../app/AppContext';
import AppService from './AppService';
import BasicError from './BasicError';
import GlobalService from './GlobalService';
import Service, { create, handler, serviceClass } from './Service';
import { Class, ID, ServiceFactory, State } from './typings';

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

  createService<S extends State, T extends AppService<S>>(ctor: Class<T>, context: AppContext, initialState: S): T {
    const instance = this.instanceRegistry[(ctor as any)[ID]];
    if (instance) {
      return instance;
    }
    const types = Reflect.getMetadata('design:paramtypes', ctor) || [];
    const args = types.map((type: any) => {
      if (!type[ID]) {
        throw new BasicError(`Cannot find a valid class for service ${type}`);
      }
      return this.instanceRegistry[type[ID]] || this.createService(type, context, context.store.getState());
    });

    const ActualClass = this.getServiceClass(ctor);
    const service = new ActualClass(...args);
    service.context = context;

    Object.getOwnPropertyNames(service).forEach((property) => {
      if (service[property] && service[property][serviceClass]) {
        const dependency = this.createService(service[property][serviceClass], context, context.store.getState());
        (service as any)[property] = dependency;
      }
    });

    service[create](initialState);

    const proxy = new Proxy(service, handler);
    if (service instanceof GlobalService) {
      this.instanceRegistry[(ctor as any)[ID]] = proxy;
    }
    return proxy as T;
  }
}