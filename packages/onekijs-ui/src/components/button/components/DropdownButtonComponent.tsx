import React, { FC, useState } from 'react';
import Button from '..';
import { addClassname } from '../../../utils/style';
import Dropdown from '../../dropdown';
import TogglerIcon from '../../icon/TogglerIcon';
import ListComponent from '../../list/components/ListComponent';
import { DropDownButtonProps } from '../typings';

const DropdownButtonComponent: FC<DropDownButtonProps> = ({
  onClick,
  animationTimeout = 200,
  distance = 0,
  placement = 'bottom',
  className,
  controller,
  children,
  ...props
}) => {
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const classNames = addClassname('o-button-dropdown', className);

  const doClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(!open);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <span ref={setContainerRef} className={classNames}>
      <Button {...props} onClick={doClick}>
        <span className="o-button-dropdown-content">{children}</span>
        <span className="o-button-dropdown-icon">
          <TogglerIcon width="16px" height="16px" open={open} closeArrowPosition="s" openArrowPosition="n" />
        </span>
      </Button>
      <Dropdown {...props} refElement={containerRef} open={open} placement={placement}>
        <ListComponent {...props} controller={controller} className="o-button-dropdown-list" height={200} />
      </Dropdown>
    </span>
  );
};

export default DropdownButtonComponent;
