import React, { useRef } from 'react';
import { ResizerProps } from '../typings';
import ResizerVerticalSplitter from './ResizerVerticalSplitter';

const ResizerComponent: React.FC<ResizerProps> = ({ className, children, handles = [], onResize }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={className} style={{ position: 'relative', height: '100%', overflow: 'hidden' }} ref={ref}>
      {children}
      {(handles.includes('e') || handles.includes('all')) && (
        <ResizerVerticalSplitter onResize={onResize} target={ref} handle="e" />
      )}
    </div>
  );
};

export default ResizerComponent;
