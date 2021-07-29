import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import GridService from '../GridService';
import { GridProps } from '../typings';
import { GridColumnsContext } from '../useGridColumns';
import { GridContext } from '../useGridContext';
import { GridValueContext } from '../useGridValue';
import GridBodyComponent from './GridBodyComponent';

const GridComponent = React.forwardRef<HTMLDivElement, GridProps>(({ service, bodyRef }, ref) => {
  const classNames = addClassname('o-grid', service.className);

  const contextRef = useRef<GridService>(service);
  const bodyClassName =
    typeof service.bodyClassName === 'function' ? service.bodyClassName(service) : service.bodyClassName;

  const BodyComponent = service.BodyComponent || GridBodyComponent;

  return (
    <GridContext.Provider value={contextRef.current}>
      <GridColumnsContext.Provider value={service.columns}>
        <GridValueContext.Provider value={service.items}>
          <div className={classNames} ref={ref}>
            <BodyComponent
              RowComponent={service.RowComponent}
              columns={service.columns}
              collection={service}
              height={service.height}
              className={bodyClassName}
              ref={bodyRef}
            />
          </div>
        </GridValueContext.Provider>
      </GridColumnsContext.Provider>
    </GridContext.Provider>
  );
});

GridComponent.displayName = 'Grid';

export default GridComponent;
