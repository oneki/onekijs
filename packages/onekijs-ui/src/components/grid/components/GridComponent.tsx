import { AnonymousObject, get, useCollection } from "onekijs";
import React, { useEffect, useRef } from "react";
import { addClassname } from "../../../utils/style";
import { GridBodyCellProps, GridBodyRowProps, GridProps } from "../typings";
import useGridContext, { DefaultGridContext } from "../useGridContext";

const BodyCellComponent: React.FC<GridBodyCellProps> = ({
  column,
  value,
  widthRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el !== null) {
      const cellWidth = el.getBoundingClientRect().width;
      const currentMaxCellWidth = widthRef.current[column.key] || 0;
      if (cellWidth > currentMaxCellWidth) {
        widthRef.current[column.key] = el.getBoundingClientRect().width;
      }
    }
  }, [])

  return <div ref={ref} className="o-grid-body-cell" style={{width: column.width}}>{value}</div>
}

const BodyRowComponent: React.FC<GridBodyRowProps> = ({
  rowIndex,
  value,
  widthRef
}) => {
  const { columns } = useGridContext();
  if (value === undefined) {
    return null;
  }
  return (
    <div className="o-grid-body-row">
      {columns.map((column, index) => {
        const cellValue = get(value.data, column.key);
        return (
          <BodyCellComponent
            column={column}
            colKey={column.key}
            colIndex={index}
            rowIndex={rowIndex}
            rowId={value.id}
            value={cellValue}
            rowValue={value}
            key={`cell-${index}`}
            widthRef={widthRef}
          />
        )
      })}
    </div>
  )
}

const GridComponent: React.FC<GridProps> = React.memo(({
  className,
  items,
  columns,
}) => {
  const collection = useCollection(items);
  const classNames = addClassname('o-grid', className);
  const widthRef = useRef<AnonymousObject<number>>({});
  const columnsRef = useRef(columns);

  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);  
  
  const context = {
    value: collection,
    columns: columnsRef.current,
  }

  useEffect(() => {
    for (let column of columnsRef.current) {
      column.width = widthRef.current[column.key]; 
    }
    forceUpdate();
  }, [])

  return (
    <DefaultGridContext.Provider value={context}>
      <div className={classNames}>
        {(collection.items||[]).map((rowValue, index) => {
          return (
            <BodyRowComponent
              rowIndex={index}
              value={rowValue}
              key={`row-${index}`}
              widthRef={widthRef}
            />
          )
        })}
      </div>
    </DefaultGridContext.Provider>
  )
});

export default GridComponent;