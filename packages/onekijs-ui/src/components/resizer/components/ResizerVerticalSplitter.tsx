import { FCC, useEventListener } from 'onekijs-framework';
import React from 'react';
import { useResizerService } from '../ResizerService';
import { ResizerHandle, ResizeVerticalSplitterProps } from '../typings';

const getClassNames = (handle: ResizerHandle, active?: boolean, hover?: boolean) => {
  return `o-resizer-vertical-splitter o-resizer-${handle}-splitter${active || hover ? ' o-resizer-active' : ''}`;
};

const ResizerVerticalSplitter: FCC<ResizeVerticalSplitterProps> = ({ children, target, handle, onResize }) => {
  const [resizerState, resizerService] = useResizerService(onResize);
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
  };

  if (handle === 'e') {
    style.right = 0;
  }

  useEventListener('mousemove', (e) => resizerService.onResize(e));

  return (
    <div
      className={getClassNames(handle, resizerState.active, resizerState.hover)}
      style={style}
      onMouseEnter={() => resizerService.onEnter()}
      onMouseLeave={() => resizerService.onLeave()}
      onMouseDown={(e) => resizerService.startResize(handle, target, e.screenX, e.screenY)}
      onMouseUp={() => resizerService.stopResize()}
    >
      {children}
    </div>
  );
};

export default ResizerVerticalSplitter;
