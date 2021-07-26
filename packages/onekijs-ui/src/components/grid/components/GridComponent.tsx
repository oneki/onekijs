import React from "react";
import { useObjectProxy } from "@oneki/core";
import { addClassname } from "../../../utils/style";
import { GridContext, GridProps } from "../typings";
import { DefaultGridContext } from "../useGridContext";
import GridBodyComponent from "./GridBodyComponent";

const GridComponent: React.FC<GridProps> = React.memo(({
  controller
}) => {
  const classNames = addClassname('o-grid', controller.className);

  const context = useObjectProxy<GridContext>(controller, {
    'omit': ['data', 'hasMore', 'items', 'status', 'total', 'columns', 'className']
  })

  return (
    <DefaultGridContext.Provider value={context}>
      <div className={classNames}>
        <GridBodyComponent controller={controller} />
      </div>
    </DefaultGridContext.Provider>
  )
});

export default GridComponent;