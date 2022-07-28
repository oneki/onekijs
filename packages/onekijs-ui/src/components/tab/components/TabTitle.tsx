import React, { FC } from 'react';
import { TabTitleProps } from '../typings';

const TabTitle: FC<TabTitleProps<any>> = ({ tab, onActivate }) => {
  return (
    <div className="o-tab-title" onClick={onActivate}>
      {tab.icon}
      <span>{`${tab.title}`}</span>
    </div>
  );
};

export default TabTitle;
