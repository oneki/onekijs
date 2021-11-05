import React from 'react';
import { addClassname } from '../../../utils/style';
import { TableValueContext } from '../hooks/useTableValue';
import { TreeProps } from '../typings';

const TreeComponent: React.FC<TreeProps> = ({ controller, className }) => {
  const classNames = addClassname('o-tree', className);
  
  return (
    <TreeControllerContext.Provider value={controller.asService()}>
      <TreeStateContext.Provider value={controller.state}>
        <TableValueContext.Provider value={items}>
          <div
            className={classNames}
            style={{
              maxHeight: height,
              overflow: 'auto',
            }}
          >
            {header && <HeaderComponent columns={columns} className={headerClassName} />}
            <BodyComponent
              items={items || []}
              columns={columns}
              tableRef={tableRef}
              contentRef={contentRef}
              className={bodyClassName}
            />
            {footer && <FooterComponent columns={columns} className={footerClassName} />}
          </div>
        </TableValueContext.Provider>
      </TreeStateContext.Provider>
    </TreeControllerContext.Provider>
  );
};

TableComponent.displayName = 'Table';

export default TableComponent;
