import { useGlobalProp } from 'onekijs-next';
import React, { FC } from 'react';
import { useLoadingService } from '../modules/core/services/LoadingService';

const IndexPage: FC = () => {
  const loadingService = useLoadingService();
  const loading = useGlobalProp('loading');
  return (
    <div>
      <button onClick={() => loadingService.load()} disabled={loading}>
        {loading ? 'Loading' : 'Load'}
      </button>
    </div>
  );
};

export default IndexPage;
