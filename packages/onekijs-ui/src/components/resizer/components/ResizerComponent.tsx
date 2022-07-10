import { FCC } from 'onekijs-framework';
import React, { useRef } from 'react';
import { ResizerProps } from '../typings';
import ResizerHorizontalSplitter from './ResizerHorizontalSplitter';
import ResizerVerticalSplitter from './ResizerVerticalSplitter';

const ResizerComponent: FCC<ResizerProps> = ({ className, children, handles = [], onResize }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={className} style={{ position: 'relative', height: '100%', overflow: 'hidden' }} ref={ref}>
      {children}
      {(handles.includes('e') || handles.includes('all')) && (
        <ResizerVerticalSplitter onResize={onResize} target={ref} handle="e" />
      )}
      {(handles.includes('w') || handles.includes('all')) && (
        <ResizerVerticalSplitter onResize={onResize} target={ref} handle="w" />
      )}
      {(handles.includes('n') || handles.includes('all')) && (
        <ResizerHorizontalSplitter onResize={onResize} target={ref} handle="n" />
      )}
      {(handles.includes('s') || handles.includes('all')) && (
        <ResizerHorizontalSplitter onResize={onResize} target={ref} handle="s" />
      )}
    </div>
  );
};

export default ResizerComponent;
