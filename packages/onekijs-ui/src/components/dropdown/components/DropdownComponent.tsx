import observeRect from '@reach/observe-rect';
import { useIsomorphicLayoutEffect } from '@oneki/core';
import React, { FC, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { sameWidthPopperModifier } from '../../../utils/popper';
import { DropdownProps } from '../typings';



const TooltipComponent: FC<DropdownProps> = ({ className, refElement, open, children, skidding=0, distance=0, onUpdate }) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { forceUpdate, styles, attributes } = usePopper(refElement, popperElement, {
    modifiers: [
      sameWidthPopperModifier,
      {
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      }     
    ],
  });
  const previousRectRef = useRef<DOMRect>();

  useIsomorphicLayoutEffect(() => {
    if (!refElement) return;
    const observer = observeRect(refElement, rect => {
      if (previousRectRef.current && (previousRectRef.current.height !== rect.height || previousRectRef.current.width !== rect.width)) {
        forceUpdate && forceUpdate();
        onUpdate && onUpdate();
      }
      previousRectRef.current = rect;
    });

    observer.observe()

    return () => {
      observer.unobserve()
    }
  }, [refElement, forceUpdate])

  return (
    <CSSTransition
      in={open}
      timeout={300}
      classNames="o-dropdown"
      mountOnEnter={true}
      appear={true}
      unmountOnExit={true}
    >
      <div
        style={styles.popper}
        {...attributes.popper}
        ref={setPopperElement}
        key="dropdown-container"
        className={className}
      >
        {children}
      </div>
    </CSSTransition>
  );
};

export default TooltipComponent;
