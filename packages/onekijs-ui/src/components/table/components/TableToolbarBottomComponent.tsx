import React from 'react';
import { useTableConfig } from '../hooks/useTableConfig';

const TableToolbarBottomComponent: React.FC = () => {
  const { ToolbarBottomCenterComponent, ToolbarBottomLeftComponent, ToolbarBottomRightComponent } = useTableConfig();
  return (
    <div className={`o-table-actions o-table-actions-bottom`}>
      <div className="o-table-action-bottom-left">{ToolbarBottomLeftComponent && <ToolbarBottomLeftComponent />}</div>
      <div className="o-table-action-bottom-center">
        {ToolbarBottomCenterComponent && <ToolbarBottomCenterComponent />}
      </div>
      <div className="o-table-action-bottom-center">
        {ToolbarBottomRightComponent && <ToolbarBottomRightComponent />}
      </div>
    </div>
  );
};

export default TableToolbarBottomComponent;
