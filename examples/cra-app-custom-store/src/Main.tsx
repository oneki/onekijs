import { useGlobalProp } from 'onekijs';
import React, { FC } from 'react';
import { useLoadingService } from './LoadingService';

export const Main: FC = () => {
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
