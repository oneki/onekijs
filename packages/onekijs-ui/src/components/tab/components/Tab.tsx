import { FCC } from 'onekijs-framework';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useTab from '../hooks/useTab';
import { useTabsState } from '../hooks/useTabsState';
import { TabProps } from '../typings';
import TabTitle from './TabTitle';

const Tab: FCC<TabProps> = ({
  title,
  active = false,
  disabled = false,
  visible = true,
  closable = false,
  children,
  Component = TabTitle,
  icon,
  uid,
}) => {
  const tab = useTab({
    title,
    active,
    disabled,
    visible,
    closable,
    TitleComponent: Component,
    icon,
    uid: uid === undefined ? title : uid,
  });

  const onEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
  };

  const { animate } = useTabsState();

  const onEntering = (node: HTMLElement) => {
    setTimeout(() => {
      node.style.opacity = '1';
      node.style.transition = `opacity ${animate}ms ease-in-out`;
    }, 0);
  };

  if (!tab || !tab.active) {
    return null;
  }

  return (
    <CSSTransition in={true} timeout={5000} appear={true} onEnter={onEnter} onEntering={onEntering}>
      <div className="o-tab">{children}</div>
    </CSSTransition>
  );
};

export default Tab;
