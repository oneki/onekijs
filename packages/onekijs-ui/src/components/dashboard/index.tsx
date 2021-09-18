import { useService } from 'onekijs';
import React from 'react';
import DashboardContainer from './components/DashboardContainer';
import DashboardOverlay from './components/DashboardOverlay';
import { DashboardService } from './DashboardService';
import { DashboardServiceContext } from './hooks/useDashboardService';
import { DashboardStateContext } from './hooks/useDashboardState';
import { DashboardProps, DashboardState } from './typings';

const Dashboard: React.FC<DashboardProps> = ({
  ContainerComponent = DashboardContainer,
  OverlayComponent = DashboardOverlay,
  children,
}) => {
  const [state, service] = useService(DashboardService, {} as DashboardState);

  return (
    <DashboardServiceContext.Provider value={service}>
      <DashboardStateContext.Provider value={state}>
        <ContainerComponent
          areas={state.areas}
          header={state.header}
          footer={state.footer}
          left={state.left}
          right={state.right}
          body={state.body}
        >
          <OverlayComponent show={service.showOverlay()} onClick={() => service.collapse('all')} />
          {children}
        </ContainerComponent>
      </DashboardStateContext.Provider>
    </DashboardServiceContext.Provider>
  );
};

export default Dashboard;
