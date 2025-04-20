import React, { useRef } from 'react';
import { addClassname } from '../../../utils/style';
import LoadingIcon from '../../icon/LoadingIcon';
import { ButtonProps } from '../typings';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { kind, pattern, className, loading, IconComponent, onClick, type = 'button', ...buttonProps } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  let classNames = addClassname('o-button', className);
  if (loading) {
    classNames = addClassname('o-button-loading', classNames);
  }
  if (props.disabled) {
    classNames = addClassname('o-button-disabled', classNames);
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!onClick) {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    } else {
      onClick(e);
    }
  }

  return (
    <span className={classNames} onClick={handleClick} ref={ref}>
      {loading && <LoadingIcon onClick={undefined} color="currentColor" />}
      {!loading && IconComponent && <IconComponent {...props} onClick={undefined} className="o-button-icon" />}
      <button ref={buttonRef} {...buttonProps} type={type} className="o-button-content" />
    </span>
  );
});

ButtonComponent.displayName = 'Button';

export default ButtonComponent;
