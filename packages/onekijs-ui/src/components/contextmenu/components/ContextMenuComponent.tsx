import React, { useState, useCallback, useEffect } from 'react';
import { autoUpdate, flip, offset, shift, useFloating, VirtualElement } from '@floating-ui/react';
import { ContextMenuProps } from '../typings';
import { FCC } from 'onekijs-framework';
import { addClassname } from '../../../utils/style';

const ContextMenuComponent: FCC<ContextMenuProps> = ({ refElement, className, children, offsetX = 0, offsetY = 0 }) => {
  const [visible, setVisible] = useState(false);

  const { floatingStyles, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [offset({ crossAxis: offsetX, mainAxis: offsetY }), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Handle the right-click event
  const handleContextMenu = useCallback((e: any) => {
    e.preventDefault(); // Prevent the browser's default context menu

    const x = e.clientX;
    const y = e.clientY;

    // Define a VirtualElement object that implements getBoundingClientRect
    const newVirtualElement: VirtualElement = {
      getBoundingClientRect: () => ({
        width: 0,
        height: 0,
        top: y,
        right: x,
        bottom: y,
        left: x,
        x: x,
        y: y,
        toJSON: () => {}
      }),
    };

    refs.setPositionReference(newVirtualElement);
    setVisible(true);
  }, []);

  // Close the menu on left click or scroll
  useEffect(() => {
    const closeMenu = () => setVisible(false);

    window.addEventListener('click', closeMenu);
    window.addEventListener('scroll', closeMenu);

    if (refElement instanceof HTMLElement) {
      refElement.addEventListener('contextmenu', handleContextMenu);
    } else if(refElement.current !== null) {
      refElement.current.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('scroll', closeMenu);
      if (refElement instanceof HTMLElement) {
        refElement.removeEventListener('contextmenu', handleContextMenu);
      } else if(refElement.current !== null) {
        refElement.current.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, []);

  if (visible) {
    return (
        <div
          ref={refs.setFloating}
          className={addClassname('o-context-menu', className)}
          style={{
            ...floatingStyles,
          }}
        >
          {children}
        </div>
      )
  }
  return null;
};

export default ContextMenuComponent;
