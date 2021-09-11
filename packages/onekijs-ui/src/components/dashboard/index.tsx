import React, { useEffect } from 'react';
import DashboardContainer from './components/DashboardContainer';
import DashboardOverlay from './components/DashboardOverlay';
import { DashboardContext, useDashboardService } from './service';
import { DashboardArea, DashboardPanelProps, DashboardProps } from './typings';

const Dashboard: React.FC<DashboardProps> = ({
  ContainerComponent = DashboardContainer,
  OverlayComponent = DashboardOverlay,
  children,
}) => {
  const [state, service] = useDashboardService();

  useEffect(() => {
    if (!state.initialized) {
      const panels: { area: DashboardArea; props: DashboardPanelProps }[] = [];
      if (children) {
        React.Children.toArray(children).forEach((child: any) => {
          const area: DashboardArea = child.type.displayName;
          panels.push({
            area,
            props: child.props,
          });
        });
        service.initPanels(panels);
      }
    }
  });

  if (!state.initialized) {
    return null;
  }

  return (
    <DashboardContext.Provider value={service}>
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
    </DashboardContext.Provider>
  );
};

export default Dashboard;
