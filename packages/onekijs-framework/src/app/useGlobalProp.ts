import { useSelector } from 'react-redux';
import { get } from '../utils/object';

function useGlobalProp<T = any>(prop: string): T | undefined;
function useGlobalProp<T = any>(prop: string, defaultValue: undefined): T | undefined;
function useGlobalProp<T = any>(prop: string, defaultValue: null): T | null;
function useGlobalProp<T = any>(prop: string, defaultValue: T): T;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useGlobalProp(prop: string, defaultValue?: any): any {
  const value = useSelector((state: any) => {
    return get(state, prop);
  });
  return value === undefined ? defaultValue : value;
}

export default useGlobalProp;
