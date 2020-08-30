import React, { FC } from 'react';
import useSetting from '../../../app/useSetting';
import { UseGetOptions } from '../../typings';
import useGet from '../../useGet';

type UseGetWidgetProps = {
  path?: string;
  baseUrl?: string;
  options?: UseGetOptions;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const textDisplay = (data: any) => `RESULT=${JSON.stringify(data)}`;

const UseGetWidget: FC<UseGetWidgetProps> = ({ path = '', baseUrl, options }) => {
  // baseUrl is defined in settings.js
  const settingsBaseUrl = useSetting('server.baseUrl');
  baseUrl = baseUrl || settingsBaseUrl || 'http://localhost';

  const [data, loading] = useGet(`${baseUrl}${path}`, options);

  if (loading) return <div>Loading ...</div>;
  return <>{data && <span data-testid="use-get-result">{textDisplay(data)}</span>}</>;
};

export default UseGetWidget;
