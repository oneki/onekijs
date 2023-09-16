import RefreshIcon from '../../icon/RefreshIcon';
import { useTableConfig } from '../hooks/useTableConfig';
import React from 'react';
import useTableService from '../hooks/useTableService';
import Button from '../../button';

const TableActionComponent: React.FC = () => {
  const { showRefreshButton, refreshButtonKind } = useTableConfig();
  const table = useTableService();
  return (
    <div className="o-table-actions">
      <div className="o-table-action">

      </div>
      {showRefreshButton  && <div className="o-table-refresh">
        <Button kind={refreshButtonKind} size="small" IconComponent={() => <RefreshIcon />} onClick={() => table.reload()}>Refresh</Button>
      </div>}
    </div>
  )
}

export default TableActionComponent;
