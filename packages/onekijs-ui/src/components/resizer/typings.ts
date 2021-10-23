export type ResizerVerticalHandle = 'e' | 'w';
export type ResizerHorizontallHandle = 'n' | 's';
export type ResizerHandle = ResizerVerticalHandle | ResizerHorizontallHandle | 'se' | 'sw' | 'nw' | 'all';

export type ResizeStep = 'start' | 'stop' | 'run';

export type ResizerHandler = (step: ResizeStep, nextWidth: number, nextHeight: number) => void;

export interface ResizerProps {
  className?: string;
  onResize: ResizerHandler;
  handles?: ResizerHandle[];
  minWidth?: string | 0;
  maxWidth?: string | 0;
  minHeight?: string | 0;
  maxHeight?: string | 0;
}

export interface ResizeSplitterProps {
  onResize: ResizerHandler;
  target: React.RefObject<HTMLDivElement>;
}

export interface ResizeVerticalSplitterProps extends ResizeSplitterProps {
  handle: ResizerVerticalHandle;
}

export interface ResizeHorizontalSplitterProps extends ResizeSplitterProps {
  handle: ResizerHorizontallHandle;
}

export interface ResizerState {
  active?: boolean;
  height?: number;
  hover?: boolean;
  lastX?: number;
  lastY?: number;
  width?: number;
  handler: ResizerHandler;
}
