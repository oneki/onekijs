import GridService from './GridService';
import React, { FC } from 'react';
import Grid from '.';

export default (
  service: GridService,
  gridRef: React.RefObject<HTMLDivElement>,
  bodyRef: React.RefObject<HTMLDivElement>,
): FC => {
  const GridComponent = service.GridComponent || Grid;
  const Component: FC = () => <GridComponent service={service} ref={gridRef} bodyRef={bodyRef} />;
  Component.displayName = 'Grid';
  return Component;
};
