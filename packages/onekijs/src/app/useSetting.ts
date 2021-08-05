import { get } from '../utils/object';
import useAppContext from './useAppContext';

function useSetting<T = any>(selector: string): T | undefined;
function useSetting<T = any>(selector: string, defaultValue: undefined): T | undefined;
function useSetting<T = any>(selector: string, defaultValue: null): T | null;
function useSetting<T = any>(selector: string, defaultValue: T): T;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useSetting(selector: string, defaultValue?: any): any {
  const settings = useAppContext().settings;
  return get(settings, selector, defaultValue);
}
export default useSetting;
