import React, { FC, useMemo } from 'react';
import { addClassname } from '../../../utils/style';
import { DefaultPropertiesContext } from '../hooks/usePropertiesContext';
import { PropertiesContext, PropertiesProps } from '../typings';
import Property from './Property';

const PropertiesComponent: FC<PropertiesProps> = ({
  className,
  properties,
  PropertyComponent = Property,
  ErrorBoundaryComponent,
  order = false,
  size,
  sm,
  md,
  lg,
  xl,
}) => {
  const classNames = addClassname('o-properties', className);
  const keys = Object.keys(properties);
  if (order) {
    keys.sort();
  }
  const context = useMemo<PropertiesContext>(() => {
    return {
      size,
      sm,
      md,
      lg,
      xl,
    };
  }, [size, sm, md, lg, xl]);

  return (
    <DefaultPropertiesContext.Provider value={context}>
      <div className={classNames}>
        {keys.map((key) => (
          <PropertyComponent key={key} name={key} value={properties[key]} ErrorBoundaryComponent={ErrorBoundaryComponent} />
        ))}
      </div>
    </DefaultPropertiesContext.Provider>
  );
};

export default PropertiesComponent;
