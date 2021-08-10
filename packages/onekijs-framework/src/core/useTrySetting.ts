import { get } from '../utils/object';
import useTryAppContext from './useTryAppContext';

function useTrySetting<T = any>(selector: string): T | undefined;
function useTrySetting<T = any>(selector: string, defaultValue: undefined): T | undefined;
function useTrySetting<T = any>(selector: string, defaultValue: null): T | null;
function useTrySetting<T = any>(selector: string, defaultValue: T): T;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useTrySetting(selector: string, defaultValue?: any): any {
  const settings = useTryAppContext()?.settings;
  if (settings) {
    return get(settings, selector, defaultValue);
  }
  return defaultValue;
}
export default useTrySetting;
