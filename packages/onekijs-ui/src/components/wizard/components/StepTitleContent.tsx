import React, { FC } from 'react';
import { StepTitleProps } from '../typings';

const StepTitleContent: FC<StepTitleProps> = ({ member, index }) => {
  return (
    <>
      {member.icon}
      <span className="o-step-title">
        {index}. {`${member.title}`}
      </span>
    </>
  );
};

export default StepTitleContent;
