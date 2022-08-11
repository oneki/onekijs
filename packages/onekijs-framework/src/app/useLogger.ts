import { LogLevel, UseLogger } from './typings';
import useLogLevel from './useLogLevel';

const levels = ['error', 'warning', 'info', 'debug', 'trace'];

export const useLogger: UseLogger = () => {
  const logLevel = useLogLevel();

  const doLog = (level: LogLevel) => {
    return levels.indexOf(level) <= levels.indexOf(logLevel);
  };

  return {
    error: (...args) => {
      if (doLog('error')) console.error(...args);
    },
    warn: (...args) => {
      if (doLog('warning')) console.warn(...args);
    },
    info: (...args) => {
      if (doLog('info')) console.log(...args);
    },
    debug: (...args) => {
      if (doLog('debug')) console.log(...args);
    },
    trace: (...args) => {
      if (doLog('trace')) console.log(...args);
    },
    log: (logLevel: LogLevel, ...args) => {
      if (doLog(logLevel)) console.log(...args);
    },
  };
};

export default useLogger;
