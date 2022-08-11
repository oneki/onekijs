import React from 'react';
import { addClassname } from '../../../utils/style';
import { ButtonProps } from '../typings';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { kind, pattern, className, loading, IconComponent, ...buttonProps } = props;
  let classNames = addClassname('o-button', className);
  if (loading) {
    classNames = addClassname('o-button-loading', classNames);
  }
  if (props.disabled) {
    classNames = addClassname('o-button-disabled', classNames);
  }
  return (
    <span className={classNames}>
      {IconComponent && <IconComponent {...props} />}
      <button {...buttonProps} ref={ref} />
    </span>
  );
});

ButtonComponent.displayName = 'Button';

export default ButtonComponent;
