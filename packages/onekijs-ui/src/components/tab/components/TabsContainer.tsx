import { FCC } from 'onekijs-framework';
import React, { useCallback } from 'react';
import { addClassname } from '../../../utils/style';
import useTabsService from '../hooks/useTabsService';
import { useTabsState } from '../hooks/useTabsState';
import { TabsProps, TabState } from '../typings';

const TabsContainer: FCC<Omit<TabsProps, 'Component'>> = ({ className, children }) => {
  const classNames = addClassname('o-tabs', className);
  const state = useTabsState();
  const service = useTabsService();

  const activate = useCallback(
    (tab: TabState) => {
      if (!tab || tab.disabled) return;
      if (!tab.active) {
        service.activate(tab.uid);
      }
    },
    [service],
  );

  return (
    <div className={classNames}>
      <div className="o-tabs-title">
        {state.tabs.map((tab) => {
          const Component = tab.TitleComponent;
          return <Component key={tab.uid} tab={tab} onActivate={activate} />;
        })}
      </div>
      <div className="o-tabs-content">{children}</div>
    </div>
  );
};

export default TabsContainer;