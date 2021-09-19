import React from 'react';
import { useResizerService } from '../ResizerService';
import { ResizerHandle, ResizeSplitterProps } from '../typings';

const getClassNames = (handle: ResizerHandle, active?: boolean, hover?: boolean) => {
  return `o-resizer-vertical-splitter o-resizer-${handle}-splitter${active || hover ? ' o-resizer-active' : ''}`;
};

const ResizerVerticalSplitter: React.FC<ResizeSplitterProps> = ({ children, target, handle }) => {
  const [resizerState, resizerService] = useResizerService();
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
  };

  if (handle === 'e') {
    style.right = 0;
  }

  return (
    <div
      className={getClassNames(handle, resizerState.active, resizerState.hover)}
      style={style}
      onMouseEnter={() => resizerService.onEnter()}
      onMouseLeave={() => resizerService.onLeave()}
      onMouseDown={(e) => resizerService.startResize(target, e.screenX, e.screenY)}
      onMouseUp={() => resizerService.stopResize()}
    >
      {children}
    </div>
  );
};

export default ResizerVerticalSplitter;
