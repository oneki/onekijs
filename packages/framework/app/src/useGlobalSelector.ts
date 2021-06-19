import { useSelector } from 'react-redux';
import { GlobalSelectorFunction } from './typings';

function useGlobalSelector<T = any>(selector: GlobalSelectorFunction): T | undefined;
function useGlobalSelector<T = any>(selector: GlobalSelectorFunction, defaultValue: undefined): T | undefined;
function useGlobalSelector<T = any>(selector: GlobalSelectorFunction, defaultValue: null): T | null;
function useGlobalSelector<T = any>(selector: GlobalSelectorFunction, defaultValue: T): T;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useGlobalSelector(selector: GlobalSelectorFunction, defaultValue?: any): any {
  const value = useSelector(selector);
  return value === undefined ? defaultValue : value;
}

export default useGlobalSelector;
