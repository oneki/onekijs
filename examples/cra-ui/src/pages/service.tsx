import 'reflect-metadata'
import { DefaultGlobalService, NotificationService, service, useGlobalService } from 'onekijs';
import React from 'react';

@service
class UiService extends DefaultGlobalService {
  constructor (private notificationService: NotificationService) {
    super();
  }

  getNotificationService() {
    return this.notificationService;
  }
}

const UiServicePage: React.FC = () => {
  const service = useGlobalService(UiService);
  console.log(service.getNotificationService());
  return null;
}

export default UiServicePage;
