import React from 'react';
import { addClassname } from '../../../utils/style';
import LoadingIcon from '../../icon/LoadingIcon';
import { ButtonProps } from '../typings';

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      {loading && (
        <span className="o-button-icon">
          <LoadingIcon onClick={undefined} color="currentColor" />
        </span>
      )}
      {!loading && IconComponent && (
        <span className="o-button-icon">
          <IconComponent {...props} onClick={undefined} />
        </span>
      )}
      <span className="o-button-content">{children}</span>
    </button>
  );
});

ButtonComponent.displayName = 'Button';

export default ButtonComponent;
