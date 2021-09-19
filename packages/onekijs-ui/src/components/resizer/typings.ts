export type ResizerHandle = 'n' | 'e' | 's' | 'w' | 'se' | 'sw' | 'nw' | 'all';

export interface ResizerProps {
  className?: string;
  onResize: (nextWidth?: string | 0, nextHeight?: string | 0) => void;
  handles?: ResizerHandle[];
  minWidth?: string | 0;
  maxWidth?: string | 0;
  minHeight?: string | 0;
  maxHeight?: string | 0;
}

export interface ResizeSplitterProps {
  handle: 'e' | 'w';
  onResize: (nextWidth?: string | 0, nextHeight?: string | 0) => void;
  target: React.RefObject<HTMLDivElement>;
}

export interface ResizerState {
  active?: boolean;
  height?: number;
  hover?: boolean;
  lastX?: number;
  lastY?: number;
  width?: number;
}
