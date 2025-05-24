import React, { FC } from 'react';
import { StepTitleProps } from '../typings';
import StepTitleContent from './StepTitleContent';

const StepTitle: FC<StepTitleProps> = (props) => {
  const { member, onActivate, TitleContentComponent = StepTitleContent } = props;
  return (
    <div
      className={`o-step${member.active ? ' o-step-active' : ' o-step-inactive'}${
        member.disabled ? ' o-step-disabled' : ' o-step-enabled'
      }${member.visible ? ' o-step-visible' : ' o-step-hidden'}${
        member.touched || member.touching ? ' o-step-touched' : ' o-step-untouched'
      }${member.success ? ' o-step-success' : ''}${
        member.touchingWarning || (member.touched && member.warning) ? ' o-step-warning' : ''
      }${member.touchingError || (member.touched && member.error) ? ' o-step-error' : ''}${
        member.loading ? ' o-step-loading' : ''
      }`}
      onClick={() => onActivate(member)}
    >
      <TitleContentComponent {...props} />
    </div>
  );
};

export default StepTitle;
