import React, { FC } from 'react';
import { StepTitleProps } from '../typings';

const StepTitle: FC<StepTitleProps> = ({ member, onActivate }) => {
  return (
    <div
      className={`o-step${member.active ? ' o-step-active' : ' o-step-inactive'}${
        member.disabled ? ' o-step-disabled' : ' o-step-enabled'
      }${member.visible ? ' o-step-visible' : ' o-step-hidden'}`}
      onClick={() => onActivate(member)}
    >
      {member.icon}
      <span className="o-member-title">{`${member.title}`}</span>
    </div>
  );
};

export default StepTitle;
