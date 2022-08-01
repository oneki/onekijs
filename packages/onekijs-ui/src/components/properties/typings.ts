import { AnonymousObject } from 'onekijs-framework';
import React, { ReactNode } from 'react';
import { GridSize } from '../grid/typings';

export type PropertiesProps = {
  properties: AnonymousObject<ReactNode>;
  PropertyComponent?: React.FC<PropertyProps>;
  order?: boolean;
  className?: string;
  size?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

export type PropertyProps = {
  value: ReactNode;
  name: string;
};

export type PropertiesContext = {
  size?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};
