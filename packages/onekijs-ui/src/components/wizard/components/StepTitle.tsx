import React, { FC } from 'react';
import { StepTitleProps } from '../typings';

const StepTitle: FC<StepTitleProps> = ({ member, onActivate, index }) => {
  return (
    <div
      className={`o-step${member.active ? ' o-step-active' : ' o-step-inactive'}${
        member.disabled ? ' o-step-disabled' : ' o-step-enabled'
      }${member.visible ? ' o-step-visible' : ' o-step-hidden'}${
        member.touched ? ' o-step-touched' : ' o-step-untouched'
      }${member.success ? ' o-step-success' : ''}${member.touchedWarning ? ' o-step-warning' : ''}${
        member.touchedError ? ' o-step-error' : ''
      }${member.loading ? ' o-step-loading' : ''}`}
      onClick={() => onActivate(member)}
    >
      {member.icon}
      <span className="o-step-title">
        {index}. {`${member.title}`}
      </span>
    </div>
  );
};

export default StepTitle;
