import GridService from './GridService';
import React, { FC } from 'react';
import Grid from '.';

export default (
  service: GridService,
  gridRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
): FC => {
  const GridComponent = service.GridComponent || Grid;
  const Component: FC = () => <GridComponent service={service} ref={gridRef} contentRef={contentRef} />;
  Component.displayName = 'Grid';
  return Component;
};
