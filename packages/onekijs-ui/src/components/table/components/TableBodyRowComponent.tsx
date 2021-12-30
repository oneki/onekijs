import React, { FC, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import { useTableConfig } from '../hooks/useTableConfig';
import { TableBodyRowProps } from '../typings';
import TableBodyCellComponent from './TableBodyCellComponent';

const timeout = 200;

const TableBodyRowComponent: FC<TableBodyRowProps> = ({
  item,
  index,
  columns,
  CellComponent = TableBodyCellComponent,
  className,
  onExpanding,
}) => {
  const [hover, setHover] = useState(false);
  const { highlightRow, stripRows } = useTableConfig();

  const expandedHeightRef = useRef<number>(0);

  const onExiting = (node: HTMLElement) => {
    const height = node.getBoundingClientRect().height;
    node.style.height = `${height}px`;
    node.style.height = '0';
    node.style.opacity = '0';
    for (let i = 0; i <= timeout; i += 50) {
      setTimeout(() => onExpanding(item, index), i);
    }
  };

  const onEnter = (node: HTMLElement) => {
    expandedHeightRef.current = node.getBoundingClientRect().height;

    //onExpand(item, index);
  };

  const onEntering = (node: HTMLElement) => {
    node.style.height = '0px';
    node.style.opacity = '0';
    setTimeout(() => {
      node.style.height = `${expandedHeightRef.current}px`;
      node.style.opacity = '1';
    }, 0);
    for (let i = 0; i <= timeout; i += 50) {
      setTimeout(() => onExpanding(item, index), i);
    }
  };

  const onEntered = () => {
    onExpanding(item, index);
  };

  const onExited = () => {
    onExpanding(item, index);
  };

  if (item === undefined) {
    return null;
  }

  const rowClassName = addClassname(
    `o-table-body-row${hover ? ' o-table-body-row-hover' : ''}${
      stripRows ? ` o-table-body-row-${index % 2 === 0 ? 'even' : 'odd'}` : ''
    }`,
    className,
  );

  const rowContainerClassName = `o-table-body-row-container${item.expanded ? ' o-table-body-row-expanded' : ''}`;

  return (
    <div className={rowContainerClassName}>
      <div
        className={rowClassName}
        onMouseEnter={highlightRow ? () => setHover(true) : undefined}
        onMouseLeave={highlightRow ? () => setHover(false) : undefined}
        style={{ display: 'flex' }}
      >
        {columns.map((column, colIndex) => {
          const cellClassName =
            typeof column.className === 'function' ? column.className(item, column, index) : column.className;
          return (
            <CellComponent
              column={column}
              colIndex={colIndex}
              rowIndex={index}
              rowId={item.id}
              item={item}
              key={`cell-${colIndex}`}
              className={cellClassName}
            />
          );
        })}
      </div>
      <CSSTransition
        in={item.expanded}
        classNames="o-table-body-row-expanded-content"
        timeout={timeout}
        mountOnEnter={true}
        appear={false}
        unmountOnExit={true}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExiting={onExiting}
        //onExit={onExit}
        onExited={onExited}
      >
        <div className="o-table-body-row-expanded-content">
          <div style={{ height: '200px', padding: '10px' }}>expanded</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default TableBodyRowComponent;
