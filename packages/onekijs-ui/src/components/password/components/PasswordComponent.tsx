import React, { useState } from 'react';
import { PasswordProps } from '../typings';
import HideIcon from '../../icon/HideIcon';
import ShowIcon from '../../icon/ShowIcon';
import { addClassname } from '../../../utils/style';
import styled from 'styled-components';
import { color } from '../../../styles/typography';
import { marginLeft } from '../../../styles/spacing';
import { display } from '../../../styles/display';
import { alignItems } from '../../../styles/alignment';
import { cursor } from '../../../styles/interactivity';

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
      <span className="o-password-text">************</span>
      <ShowIcon onClick={() => setShow(true)} />
    </span>
  );
};

export default styled(PasswordComponent)`
  ${display('flex')}
  ${alignItems('center')}
  .o-icon-show, .o-icon-hide {
    ${color('primary')}
    ${marginLeft('sm')}
    ${cursor('pointer')}
  }

`;
