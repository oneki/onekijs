import React from 'react';
import { useTableConfig } from '../hooks/useTableConfig';

const TableToolbarTopComponent: React.FC = () => {
  const {
    ToolbarTopCenterComponent,
    ToolbarTopLeftComponent,
    ToolbarTopRightComponent,
  } = useTableConfig();

  return (
    <div className={`o-table-actions o-table-actions-top`}>
      <div className="o-table-action-top-left">{ToolbarTopLeftComponent && <ToolbarTopLeftComponent />}</div>
      <div className="o-table-action-top-center">{ToolbarTopCenterComponent && <ToolbarTopCenterComponent />}</div>
      <div className="o-table-action-top-right">
        {ToolbarTopRightComponent && <ToolbarTopRightComponent />}
      </div>
    </div>
  );
};

export default TableToolbarTopComponent;
