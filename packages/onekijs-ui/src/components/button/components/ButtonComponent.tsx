import React from 'react';
import { addClassname } from '../../../utils/style';
import LoadingIcon from '../../icon/LoadingIcon';
import { ButtonProps } from '../typings';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { kind, pattern, className, loading, IconComponent, onClick, ...buttonProps } = props;
  let classNames = addClassname('o-button', className);
  if (loading) {
    classNames = addClassname('o-button-loading', classNames);
  }
  if (props.disabled) {
    classNames = addClassname('o-button-disabled', classNames);
  }
  return (
    <span className={classNames} onClick={onClick} ref={ref}>
      {loading && <LoadingIcon onClick={undefined} color="currentColor" />}
      {!loading && IconComponent && <IconComponent {...props} onClick={undefined} className="o-button-icon" />}
      <button {...buttonProps} className="o-button-content" />
    </span>
  );
});

ButtonComponent.displayName = 'Button';

export default ButtonComponent;
