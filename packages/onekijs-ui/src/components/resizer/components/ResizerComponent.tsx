import { FCC } from 'onekijs-framework';
import React, { useRef } from 'react';
import { ResizerProps } from '../typings';
import ResizerHorizontalSplitter from './ResizerHorizontalSplitter';
import ResizerVerticalSplitter from './ResizerVerticalSplitter';

const ResizerComponent: FCC<ResizerProps> = ({ className, children, handles = [], onResize, gap = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={className} ref={ref}>
      {children}
      {(handles.includes('e') || handles.includes('all')) && (
        <ResizerVerticalSplitter onResize={onResize} target={ref} handle="e" gap={gap} />
      )}
      {(handles.includes('w') || handles.includes('all')) && (
        <ResizerVerticalSplitter onResize={onResize} target={ref} handle="w" gap={gap} />
      )}
      {(handles.includes('n') || handles.includes('all')) && (
        <ResizerHorizontalSplitter onResize={onResize} target={ref} handle="n" gap={gap} />
      )}
      {(handles.includes('s') || handles.includes('all')) && (
        <ResizerHorizontalSplitter onResize={onResize} target={ref} handle="s" gap={gap} />
      )}
    </div>
  );
};

export default ResizerComponent;
