import React, { FC, ReactNode, useMemo } from 'react';
import { addClassname } from '../../../utils/style';
import { DefaultPropertiesContext } from '../hooks/usePropertiesContext';
import { PropertiesContext, PropertiesProps, PropertyProps } from '../typings';
import Property from './Property';

const isReactNode = (value: ReactNode | Partial<PropertyProps>): value is ReactNode => {
  if (value === null || value === undefined) return true;
  if (Object.keys(value).includes('value')) {
    return false;
  }
  return true;
}

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
        {keys.map((key) => {
          const property = properties[key];
          const value = isReactNode(property) ? property : property.value;
          const help = isReactNode(property) ? undefined : property.help;
          const name = isReactNode(property) ? key : property.name ?? key;
          return <PropertyComponent key={key} name={name} value={value} help={help} ErrorBoundaryComponent={ErrorBoundaryComponent} />
        })}
      </div>
    </DefaultPropertiesContext.Provider>
  );
};

export default PropertiesComponent;
