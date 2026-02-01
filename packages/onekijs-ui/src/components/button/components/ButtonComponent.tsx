import React from 'react';
import { addClassname } from '../../../utils/style';
import LoadingIcon from '../../icon/LoadingIcon';
import { ButtonProps } from '../typings';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { kind, pattern, className, loading, IconComponent, type = 'button', children, ...buttonProps } = props;
  let classNames = addClassname('o-button', className);
  if (loading) {
    classNames = addClassname('o-button-loading', classNames);
  }
  if (props.disabled) {
    classNames = addClassname('o-button-disabled', classNames);
  }

  return (
      <button ref={ref} className={classNames} {...buttonProps} type={type}>
        {loading && <LoadingIcon onClick={undefined} color="currentColor" />}
        {!loading && IconComponent && <IconComponent {...props} onClick={undefined} className="o-button-icon" />}
        <span className="o-button-content">{children}</span>
      </button>
  );
});

ButtonComponent.displayName = 'Button';

export default ButtonComponent;
