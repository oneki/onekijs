import React, { FC, useRef } from 'react';
import Button from '..';
import { useClickOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import TogglerIcon from '../../icon/TogglerIcon';
import { DropDownButtonProps } from '../typings';

const DropdownButtonComponent: FC<DropDownButtonProps> = ({
  onClick,
  animationTimeout = 200,
  distance = 0,
  placement = 'bottom',
  className,
  children,
  listElement,
  open,
  skidding,
  onUpdate,
  onDrop,
  onDropStart,
  onDropping,
  onDropDone,
  onCollapse,
  onCollapseStart,
  onCollapseDone,
  onCollapsing,
  widthModifier,
  zIndex = 1000,
  ...buttonProps
}) => {
  const classNames = addClassname('o-button-dropdown', className);
  const ref = useRef<HTMLSpanElement>(null);

  const [Dropdown, triggerRef] = useDropdown();

  useClickOutside(ref, () => onCollapse());

  return (
    <span ref={ref}>
      <Button
        {...buttonProps}
        className={classNames}
        onClick={onClick ? undefined : open ? onCollapse : onDrop}
        ref={triggerRef}
      >
        <span className="o-button-dropdown-content" onClick={onClick}>
          {children}
        </span>
        <span className="o-button-dropdown-icon">
          <TogglerIcon
            width="16px"
            height="16px"
            open={open}
            closeArrowPosition="s"
            openArrowPosition="n"
            onClick={onClick ? (open ? onCollapse : onDrop) : undefined}
          />
        </span>
      </Button>
      <Dropdown
        skidding={skidding}
        onUpdate={onUpdate}
        onDropStart={onDropStart}
        onDropping={onDropping}
        onDropDone={onDropDone}
        onCollapseStart={onCollapseStart}
        widthModifier={widthModifier}
        zIndex={zIndex}
        open={open}
        placement={placement}
        animationTimeout={animationTimeout}
      >
        {listElement}
      </Dropdown>
    </span>
  );
};

export default DropdownButtonComponent;
