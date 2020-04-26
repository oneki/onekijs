import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { isNull, or } from "../../lib/utils/object";

export const DropdownAnchor = () => {}
DropdownAnchor.$dropdownType = 'anchor';

export const DropdownMenu = () => {}
DropdownMenu.$dropdownType = 'menu';

export const DropdownPopper = styled(Popper).attrs(props => ({
  transition: or(props.transition, true),
  disablePortal: or(props.disablePortal, true),
  placement: or(props.placement, "bottom-start")
}))`
  z-index: ${props => or(props.zIndex, '10')};
  ${props => or(props.fitAnchor, true) && props.anchorEl ? `min-width: ${props.anchorEl.clientWidth}px;` : ''}
`

export const DropdownPaper = styled(Paper).attrs(props => ({
  square: or(props.square, false)
}))`

`


export const Dropdown =  React.memo(props => {
  const anchorRef = useRef(null);
  let anchor = null;
  let menuItems = [];
  const [open, setOpen] = React.useState(false);
  
  const handleToggle = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, [setOpen]);  

  const handleClose = useCallback(event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }, [anchorRef, setOpen]);

  const handleListKeyDown = useCallback(event => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }, [setOpen]);

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [prevOpen, anchorRef, open]);  

  if (props.children) {
    React.Children.toArray(props.children).forEach(child => {
      const type = child.type.$dropdownType;
      switch (type) {
        case 'anchor':
          const anchorChildren = React.Children.toArray(child.props.children)
          if (anchorChildren.length > 1) {
            throw Error("DahsboardAnchor can have only one child");
          }
          if (anchorChildren.length < 1) {
            throw Error("DahsboardAnchor must have one child");
          }
          anchor = React.cloneElement(anchorChildren[0], { 
            ref: anchorRef,
            "aria-controls": open ? "menu-list-grow" : undefined,
            "aria-haspopup": true,
            onClick: handleToggle 
          });         
          break;
        case 'menu':
          menuItems = child.props.children;
          break;
        default:
          throw Error(
            "Unknown child for component Dropdown. Only DropdownAnchor and DropdownMenu are supported as direct children of Dropdown"
          );
      }
    });
  }

  return (

      <div>
        {anchor}
        <DropdownPopper     
          {...props}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement.startsWith("bottom") ? "center top" : "left bottom"
              }}
            >
              <DropdownPaper {...props} onClick={handleClose}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {menuItems}
                  </MenuList>
                </ClickAwayListener>
              </DropdownPaper>
            </Grow>
          )}
        </DropdownPopper>
      </div>
  );
});
