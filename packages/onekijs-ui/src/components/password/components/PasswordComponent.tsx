import React, { useState } from 'react';
import { PasswordProps } from '../typings';
import HideIcon from '../../icon/HideIcon';
import ShowIcon from '../../icon/ShowIcon';
import { addClassname } from '../../../utils/style';

const PasswordComponent: React.FC<PasswordProps> = ({ className, value }) => {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <span className={addClassname('o-password', className)}>
        <span className="o-password-text">{value}</span>
        <HideIcon onClick={() => setShow(false)} />
      </span>
    );
  }

  return (
    <span className={addClassname('o-password o-password-obfuscated', className)}>
      <span className="o-password-text">{value}</span>
      <ShowIcon onClick={() => setShow(true)} />
    </span>
  );
};

export default PasswordComponent;
