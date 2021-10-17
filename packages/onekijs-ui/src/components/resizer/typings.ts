export type ResizerHandle = 'n' | 'e' | 's' | 'w' | 'se' | 'sw' | 'nw' | 'all';

export type ResizerHandler = (nextWidth: number, nextHeight: number) => void;

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
  handle: 'e' | 'w';
  onResize: ResizerHandler;
  target: React.RefObject<HTMLDivElement>;
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
