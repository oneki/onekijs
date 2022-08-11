import { FCC, useEventListener } from 'onekijs-framework';
import React from 'react';
import { useResizerService } from '../ResizerService';
import { ResizerHandle, ResizeHorizontalSplitterProps } from '../typings';

const getClassNames = (handle: ResizerHandle, active?: boolean, hover?: boolean) => {
  return `o-resizer-horizontal-splitter o-resizer-${handle}-splitter${active || hover ? ' o-resizer-active' : ''}`;
};

const ResizerHorizontalSplitter: FCC<ResizeHorizontalSplitterProps> = ({ children, target, handle, onResize }) => {
  const [resizerState, resizerService] = useResizerService(onResize);
  const style: React.CSSProperties = {
    position: 'absolute',
  };

  if (handle === 's') {
    style.bottom = 0;
  } else {
    style.top = 0;
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

export default ResizerHorizontalSplitter;
