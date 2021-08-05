import GridService from './GridService';
import React, { FC } from 'react';
import Grid from '.';

type Wrapper = (
  service: GridService<any, any, any>,
  gridRef: React.RefObject<HTMLDivElement>,
  contentRef: React.RefObject<HTMLDivElement>,
) => FC;

const wrapper: Wrapper = (service, gridRef, contentRef) => {
  const GridComponent = service.GridComponent || Grid;
  const Component: FC = () => <GridComponent service={service} ref={gridRef} contentRef={contentRef} />;
  Component.displayName = 'Grid';
  return Component;
};

export default wrapper;
