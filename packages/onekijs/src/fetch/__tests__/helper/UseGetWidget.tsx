import React, { FC, useState } from 'react';
import useSetting from '../../../app/useSetting';
import NotificationWidget from '../../../notification/__tests__/helper/NotificationWidget';
import { GetOptions } from '../../typings';
import useGet from '../../useGet';
import BasicError from '../../../core/BasicError';

type UseGetWidgetProps = {
  path?: string;
  baseUrl?: string;
  options?: GetOptions;
  onError?: boolean;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UseGetWidget: FC<UseGetWidgetProps> = ({ path = '', baseUrl, options, onError }) => {
  const [error, setError] = useState<BasicError>();
  // baseUrl is defined in settings.js
  const settingsBaseUrl = useSetting('server.baseUrl');
  baseUrl = baseUrl || settingsBaseUrl || 'http://localhost';

  if (onError) {
    options = options || {};
    options.onError = (error) => {
      setError(error);
    };
  }

  const [data, loading] = useGet(`${baseUrl}${path}`, options);

  if (loading) return <div>Loading ...</div>;
  return (
    <>
      {error && <div data-testid="use-get-on-error">{error.payload.message}</div>}
      <NotificationWidget />
      {data && (
        <>
          <span data-testid="use-get-result">{textDisplay(data)}</span>
        </>
      )}
    </>
  );
};

export default UseGetWidget;
