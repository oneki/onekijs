import { AnonymousObject } from 'onekijs-framework';
import React, { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { GridSize } from '../grid/typings';

export type PropertiesProps = {
  properties: PropertiesList;
  PropertyComponent?: React.FC<PropertyProps>;
  ErrorBoundaryComponent?: ComponentType<PropsWithChildren<PropertyProps>>;
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
  ErrorBoundaryComponent?: ComponentType<PropsWithChildren<PropertyProps>>;
};

export type PropertiesContext = {
  size?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
};

export type PropertiesList = AnonymousObject<ReactNode>;
