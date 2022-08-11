import { isItemFetching } from 'onekijs-framework';
import React, { FC, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import { useTableConfig } from '../hooks/useTableConfig';
import { TableBodyRowProps } from '../typings';
import TableBodyCellComponent from './TableBodyCellComponent';
import TableLoadingRowComponent from './TableLoadingRowComponent';

const timeout = 500;

const TableBodyRowComponent: FC<TableBodyRowProps> = ({
  item,
  index,
  columns,
  CellComponent = TableBodyCellComponent,
  className,
  onExpand,
  onExpanding,
  onExpanded,
  onCollapse,
  onCollapsing,
  onCollapsed,
}) => {
  const [hover, setHover] = useState(false);
  const {
    highlightRow,
    stripRows,
    LoadingRowComponent = TableLoadingRowComponent,
    ExpandedComponent,
  } = useTableConfig();

  const expandedHeightRef = useRef<number>(0);

  const onExiting = (node: HTMLElement) => {
    node.style.opacity = '0';
    onCollapsing && onCollapsing(item, index);
  };

  const onEntering = (node: HTMLElement) => {
    expandedHeightRef.current = node.getBoundingClientRect().height;
    // node.style.height = '0px';
    node.style.opacity = '0';
    onExpanding && onExpanding(item, index);
    setTimeout(() => {
      // node.style.height = `${expandedHeightRef.current}px`;
      node.style.opacity = '1';
      node.style.transition = `opacity ${timeout}ms ease-out`;
    }, 0);
    // for (let i = 0; i <= timeout; i += 20) {
    //   setTimeout(() => onExpanding && onExpanding(item, index), i);
    // }
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

  if (isItemFetching(item)) {
    return (
      <div className={rowContainerClassName}>
        <div className="o-table-body-row">
          <LoadingRowComponent />
        </div>
      </div>
    );
  }

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
        exit={false}
        unmountOnExit={true}
        onEnter={() => onExpand && onExpand(item, index)}
        onEntering={onEntering}
        onEntered={() => onExpanded && onExpanded(item, index)}
        onExiting={onExiting}
        onExit={() => onCollapse && onCollapse(item, index)}
        onExited={() => onCollapsed && onCollapsed(item, index)}
      >
        <div className="o-table-body-row-expanded-content">
          {ExpandedComponent && <ExpandedComponent item={item} rowIndex={index} rowId={item.id} />}
        </div>
      </CSSTransition>
    </div>
  );
};

export default TableBodyRowComponent;
