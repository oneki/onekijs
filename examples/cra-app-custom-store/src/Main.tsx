import { useGlobalProp } from 'onekijs';
import { FC } from 'react';
import { useLoadingService } from './LoadingService';

export const Main: FC = () => {
  const loadingService = useLoadingService();

  // 'loading' is a prop stored in the global state (redux)
  // This prop is updated by the global service 'LoadingService'
  const loading = useGlobalProp('loading'); 
  return (
    <div>
      <button onClick={() => loadingService.load()} disabled={loading}>
        {loading ? 'Loading' : 'Load'}
      </button>
    </div>
  );
};
