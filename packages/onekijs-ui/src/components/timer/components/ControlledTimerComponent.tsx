import React, { useEffect } from 'react';
import { addClassname } from '../../../utils/style';
import { TimerService } from '../TimerService';
import { TimerProps } from '../typings';

const defaultFormat = (ttlMs: number) => Math.ceil(ttlMs / 1000);

const ControlledTimerComponent: React.FC<TimerProps & { controller: TimerService }> = ({
  autoStart = true,
  className,
  controller,
  format = defaultFormat,
}) => {
  const { timeMs, ttlMs } = controller.state;

  useEffect(() => {
    if (autoStart) {
      controller.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let rawTimeFraction = ttlMs / timeMs;
  rawTimeFraction = rawTimeFraction - (1 / timeMs) * (1 - rawTimeFraction);
  const label = format(ttlMs, timeMs);
  const remaining = (rawTimeFraction * 283).toFixed(0);

  return (
    <div className={addClassname('o-timer', className)}>
      <svg className="o-timer-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <g className="o-timer-svg-circle">
          <circle className="o-timer-svg-elapsed" cx="60" cy="60" r="45" />
          {ttlMs && (
            <path
              strokeDasharray={`${remaining} 283`}
              className="o-timer-svg-remaining"
              d="
          M 60, 60
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          )}
        </g>
      </svg>
      <span className="o-timer-label">{label}</span>
    </div>
  );
};

export default ControlledTimerComponent;
