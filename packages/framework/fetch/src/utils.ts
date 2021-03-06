import { asResultCallback } from '@oneki/app';
import { NotificationService } from '@oneki/notification';
import { AppContext, FetchOptions, Router } from '@oneki/types';
import { AppFetchOptions } from './typings';

export function asFetchOptions<T = any>(
  options: AppFetchOptions<T>,
  notificationService: NotificationService,
  appContext: AppContext,
  router: Router,
): FetchOptions<T> {
  if (!options.onError) {
    options.onError = (e) => {
      notificationService.error(e);
    };
  } else {
    options.onError = asResultCallback(options.onError, router, appContext);
  }
  if (options.onSuccess) {
    options.onSuccess = asResultCallback(options.onSuccess, router, appContext);
  }
  return options as FetchOptions;
}
