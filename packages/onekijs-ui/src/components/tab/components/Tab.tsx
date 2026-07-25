import { FCC } from 'onekijs-framework';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import useTab from '../hooks/useTab';
import { useTabsState } from '../hooks/useTabsState';
import { TabProps } from '../typings';

const Tab: FCC<TabProps> = ({
  title,
  active = false,
  disabled = false,
  visible = true,
  closable = false,
  children,
  icon,
  uid,
  className,
}) => {
  const tab = useTab({
    title,
    active,
    disabled,
    visible,
    closable,
    icon,
    loading: false,
    touched: false,
    touching: false,
    uid: uid === undefined ? title : uid,
  });

  const onEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
  };

  const { animate } = useTabsState();
  const tabRef = React.useRef<HTMLDivElement | null>(null);

  const onEnterWithRef = () => {
    if (tabRef.current) onEnter(tabRef.current);
  };

  const onEntering = () => {
    const node = tabRef.current;
    if (!node) return;
    setTimeout(() => {
      node.style.opacity = '1';
      node.style.transition = `opacity ${animate}ms ease-in-out`;
    }, 0);
  };

  if (!tab || !tab.active) {
    return null;
  }

  return (
    <CSSTransition
      in={true}
      nodeRef={tabRef}
      timeout={animate}
      appear={true}
      onEnter={onEnterWithRef}
      onEntering={onEntering}
    >
      <div ref={tabRef} className={addClassname('o-tab', className)}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Tab;
