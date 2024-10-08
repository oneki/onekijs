import { Property } from 'csstype';
import { SizePropertyTheme, TLength } from '../../styles/typings';
import { TimerService } from './TimerService';

export type TimerOptions = {
  timeMs: number;
  ttlMs?: number;
};

export type TimerProps = Partial<TimerOptions> & {
  autoStart?: boolean;
  className?: string;
  controller?: TimerService;
  format?: (ttlMs: number, timeMs: number) => string | number;
  height?: SizePropertyTheme | Property.Height<TLength>;
  thickness?: Property.StrokeWidth<TLength>;
  width?: SizePropertyTheme | Property.Width<TLength>;
};

export type TimerState = {
  status?: 'started' | 'stopped';
  timeMs: number;
  ttlMs: number;
};

export type UseTimerController = (props: TimerOptions) => TimerService;
