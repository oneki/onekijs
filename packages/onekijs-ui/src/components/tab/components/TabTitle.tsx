import React, { FC } from 'react';
import { TabTitleProps } from '../typings';

const TabTitle: FC<TabTitleProps> = ({ tab, onActivate }) => {
  return (
    <div
      className={`o-tab${tab.active ? ' o-tab-active' : ' o-tab-inactive'}${
        tab.disabled ? ' o-tab-disabled' : ' o-tab-enabled'
      }${tab.visible ? ' o-tab-visible' : ' o-tab-hidden'}`}
      onClick={() => onActivate(tab)}
    >
      {tab.icon}
      <span className="o-tab-title">{`${tab.title}`}</span>
    </div>
  );
};

export default TabTitle;
