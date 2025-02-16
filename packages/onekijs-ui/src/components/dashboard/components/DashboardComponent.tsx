import { FCC } from 'onekijs-framework';
import React from 'react';
import { DashboardService } from '../DashboardService';
import { DashboardServiceContext } from '../hooks/useDashboardService';
import { DashboardStateContext } from '../hooks/useDashboardState';
import { DashboardProps } from '../typings';
import DashboardContainer from './DashboardContainer';
import DashboardOverlay from './DashboardOverlay';

const DashboardComponent: FCC<DashboardProps & { service: DashboardService }> = ({
  ContainerComponent = DashboardContainer,
  OverlayComponent = DashboardOverlay,
  children,
  service,
}) => {
  return (
      <DashboardServiceContext.Provider value={service}>
        <DashboardStateContext.Provider value={service.state}>
          <ContainerComponent
            areas={service.state.areas}
            header={service.state.header}
            footer={service.state.footer}
            left={service.state.left}
            right={service.state.right}
            body={service.state.body}
            onInit={service.initContainer}
            onDestroy={() => service.destroyPanel('container')}
          >
            <OverlayComponent show={service.showOverlay()} onClick={() => service.collapseFloating()} />
            {children}
          </ContainerComponent>
        </DashboardStateContext.Provider>
      </DashboardServiceContext.Provider>
  );
};

export default DashboardComponent;
