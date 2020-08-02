import { useContext } from 'react';
import { DefaultAppContext } from './AppContext';
import { get } from '../core/utils/object';

function useSetting<T = any>(selector: string): T | undefined;
function useSetting<T = any>(selector: string, defaultValue: undefined): T | undefined;
function useSetting<T = any>(selector: string, defaultValue: null): T | null;
function useSetting<T = any>(selector: string, defaultValue: T): T;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useSetting(selector: string, defaultValue?: any): any {
  const settings = useContext(DefaultAppContext).settings;
  return get(settings, selector, defaultValue);
}
export default useSetting;
