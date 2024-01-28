import React, { FC, useRef } from 'react';
import Button from '..';
import { useClickOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
import TogglerIcon from '../../icon/TogglerIcon';
import { DropDownButtonProps } from '../typings';

const DropdownButtonComponent: FC<DropDownButtonProps> = ({
  animationTimeout = 200,
  attachDropdownToBody = false,
  distance = 0,
  placement = 'bottom-start',
  className,
  children,
  listElement,
  open,
  skidding,
  onClick,
  onDrop,
  onDropStart,
  onDropping,
  onDropDone,
  onCollapse,
  onCollapseStart,
  onCollapseDone,
  onCollapsing,
  onUpdate,
  widthModifier = 'min',
  zIndex = 1000,
  ...buttonProps
}) => {
  const classNames = addClassname('o-button-dropdown', className);
  const ref = useRef<HTMLSpanElement | null>(null);

  const [Dropdown, triggerRef] = useDropdown();

  useClickOutside(ref, () => onCollapse && onCollapse());

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
        attachToBody={attachDropdownToBody}
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
