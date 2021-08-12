import React, { useEffect, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import { GridProps } from '../typings';
import { GridColumnsContext } from '../useGridColumns';
import { GridContext } from '../useGridController';
import { GridValueContext } from '../useGridValue';
import GridBodyComponent from './GridBodyComponent';
import GridFooterComponent from './GridFooterComponent';
import GridHeaderComponent from './GridHeaderComponent';

const GridComponent: React.FC<GridProps> = ({ controller, className }) => {
  const classNames = addClassname('o-grid', className);
  const {
    BodyComponent = GridBodyComponent,
    FooterComponent = GridFooterComponent,
    header = true,
    HeaderComponent = GridHeaderComponent,
    footer = false,
    height,
  } = controller;

  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controller.onMount(gridRef, contentRef);
  });

  return (
    <GridContext.Provider value={controller.asService()}>
      <GridColumnsContext.Provider value={controller.columns}>
        <GridValueContext.Provider value={controller.items}>
          <div
            className={classNames}
            ref={gridRef}
            style={{
              maxHeight: height,
              overflow: 'auto',
            }}
          >
            {header && <HeaderComponent controller={controller} />}
            <BodyComponent controller={controller} gridRef={gridRef} contentRef={contentRef} />
            {footer && <FooterComponent controller={controller} />}
          </div>
        </GridValueContext.Provider>
      </GridColumnsContext.Provider>
    </GridContext.Provider>
  );
};

GridComponent.displayName = 'Grid';

export default GridComponent;
