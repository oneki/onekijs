import 'reflect-metadata'
import { DefaultGlobalService, NotificationService, reducer, service, useGlobalProp, useGlobalService } from 'onekijs';
import React, { useEffect } from 'react';

@service
class UiService extends DefaultGlobalService {
  constructor (private notificationService: NotificationService) {
    super();
  }

  getNotificationService() {
    return this.notificationService;
  }
}

class Mixin extends DefaultGlobalService {

  @reducer
  testMixinReducer() {
    console.log('ici');
    this.state.mixin = true;
  }

}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

// Then you create an interface which merges
// the expected mixins with the same name as your base
interface UiService extends Mixin {}
// Apply the mixins into the base class via
// the JS at runtime
applyMixins(UiService, [Mixin]);

const UiServicePage: React.FC = () => {
  const service = useGlobalService(UiService);
  const myMixin = useGlobalProp('mixin');
  useEffect(() => {
    service.testMixinReducer();
  })
  console.log('myMixin', myMixin);
  return null;
}

export default UiServicePage;
