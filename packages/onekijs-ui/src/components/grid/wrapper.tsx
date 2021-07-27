import GridService from './GridService';
import React, { FC } from 'react';
import Grid from '.';

export default (service: GridService): FC => {
  const Component: FC = () => <Grid service={service} />;
  Component.displayName = 'Grid';
  return Component;
};
