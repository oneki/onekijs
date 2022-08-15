import React, { FC } from 'react';
import { TabTitleProps } from '../typings';

const TabTitle: FC<TabTitleProps> = ({ member, onActivate }) => {
  return (
    <div
      className={`o-tab${member.active ? ' o-tab-active' : ' o-tab-inactive'}${
        member.disabled ? ' o-tab-disabled' : ' o-tab-enabled'
      }${member.visible ? ' o-tab-visible' : ' o-tab-hidden'}`}
      onClick={() => onActivate(member)}
    >
      {member.icon}
      <span className="o-tab-title">{`${member.title}`}</span>
    </div>
  );
};

export default TabTitle;
