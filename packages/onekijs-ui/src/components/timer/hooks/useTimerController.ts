import { useService } from 'onekijs-framework';
import { TimerService } from '../TimerService';
import { TimerState, UseTimerController } from '../typings';

const useTimerController: UseTimerController = ({ timeMs, ttlMs }) => {
  const [_, service] = useService<TimerState, TimerService>(TimerService, {
    timeMs,
    ttlMs: ttlMs ?? timeMs,
  } as TimerState);

  return service;
};

export default useTimerController;
