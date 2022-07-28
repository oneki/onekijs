import { FCC } from 'onekijs-framework';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useTab from '../hooks/useTab';
import useTabsService from '../hooks/useTabsService';
import { useTabsState } from '../hooks/useTabsState';
import { TabProps } from '../typings';
import TabTitle from './TabTitle';

const Tab: FCC<TabProps<any>> = ({
  title,
  active,
  disabled,
  visible,
  closable,
  children,
  Component = TabTitle,
  icon,
}) => {
  const tab = useTab(title, active, disabled, visible, closable, icon);
  const service = useTabsService();
  const { animate } = useTabsState();

  const activate = () => {
    if (!tab || tab.disabled) return;
    if (!tab.active) {
      service.activate(tab.uid);
    }
  };

  if (!tab) {
    return null;
  }

  return (
    <div
      className={`o-tab${tab.active ? ' o-tab-active' : 'o-tab-inactive'}${
        tab.disabled ? ' o-tab-disabled' : 'o-tab-enabled'
      }${tab.visible ? ' o-tab-visible' : 'o-tab-hidden'}`}
    >
      <Component tab={tab} onActivate={activate} />
      <CSSTransition
        in={tab.active}
        classNames="o-tab-animate"
        timeout={animate}
        mountOnEnter={false}
        appear={false}
        unmountOnExit={true}
      >
        <div>
          <div className="o-tab-content">{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Tab;
