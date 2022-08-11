import React, { FC, useState } from 'react';
import Button from '..';
import { addClassname } from '../../../utils/style';
import useDropdown from '../../dropdown/hooks/useDropdown';
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
  dataSource,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const classNames = addClassname('o-button-dropdown', className);

  const doClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(!open);
    if (onClick) {
      onClick(e);
    }
  };

  const [Dropdown, triggerRef] = useDropdown();

  return (
    <>
      <Button {...props} onClick={doClick} className={classNames} ref={triggerRef}>
        <span className="o-button-dropdown-content">{children}</span>
        <span className="o-button-dropdown-icon">
          <TogglerIcon width="16px" height="16px" open={open} closeArrowPosition="s" openArrowPosition="n" />
        </span>
      </Button>
      <Dropdown {...props} open={open} placement={placement} animationTimeout={animationTimeout} zIndex={1000}>
        <ListComponent {...props} controller={controller} dataSource={dataSource} className="o-button-dropdown-list" />
      </Dropdown>
    </>
  );
};

export default DropdownButtonComponent;
