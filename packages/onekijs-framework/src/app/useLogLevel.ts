import { LogLevel } from './typings';
import useGlobalProp from './useGlobalProp';
import useSetting from './useSetting';

export const useLogLevel = (): LogLevel => {
  const defaultLogLevel = useSetting<LogLevel>('logLevel', 'info');
  return useGlobalProp<LogLevel>('logLevel', defaultLogLevel);
};

export default useLogLevel;
