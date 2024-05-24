import React from 'react';
import { addClassname } from '../../../utils/style';
import { FCC } from 'onekijs-framework';
import { AlertProps } from '../typings';
import InfoIcon from '../../icon/InfoIcon';
import DebugIcon from '../../icon/DebugIcon';
import ErrorIcon from '../../icon/ErrorIcon';
import WarningIcon from '../../icon/WarningIcon';
import SuccessIcon from '../../icon/SuccessIcon';

const getDefautltIconComponent = (kind: AlertProps['kind']) => {
  switch(kind) {
    case 'debug':
      return DebugIcon;
    case 'error':
      return ErrorIcon;
    case 'warning':
      return WarningIcon;
    case 'success':
      return SuccessIcon;
    default:
      return InfoIcon;
  }
}

const getIconSize = (size: AlertProps['size']) => {
  switch(size) {
    case 'small':
      return '24px';
    case 'large':
      return '48px';
    default:
      return '36px';
  }
}

const AlertComponent: FCC<AlertProps> = ({
  kind = 'info',
  icon = true,
  IconComponent,
  className,
  children,
  size,
}) => {
  if (IconComponent === undefined) {
    IconComponent = getDefautltIconComponent(kind);
  }
  return (
    <div className={addClassname(`o-alert o-alert-${kind}`, className)}>
      {icon && <IconComponent width={getIconSize(size)} height={getIconSize(size)} marginRight='20px' marginLeft='20px' />}
      <div>{children}</div>
    </div>
  )
}

export default AlertComponent;
