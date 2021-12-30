import observeRect from '@reach/observe-rect';
import { useIsomorphicLayoutEffect } from 'onekijs-framework';
import React, { FC, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { sameWidthPopperModifier } from '../../../utils/popper';
import { addClassname } from '../../../utils/style';
import { DropdownProps } from '../typings';

const DropdownComponent: FC<DropdownProps> = ({
  className,
  refElement,
  open,
  children,
  skidding = 0,
  distance = 0,
  onUpdate,
  onDropDone,
  onDropStart,
  onCollapseDone,
  onCollapseStart,
  onDropping,
  onCollapsing,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { forceUpdate, styles, attributes } = usePopper(refElement, popperElement, {
    modifiers: [
      sameWidthPopperModifier,
      {
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
    ],
  });
  const previousRectRef = useRef<DOMRect>();

  useIsomorphicLayoutEffect(() => {
    if (!refElement) return;
    const observer = observeRect(refElement, (rect) => {
      if (
        previousRectRef.current &&
        (previousRectRef.current.height !== rect.height || previousRectRef.current.width !== rect.width)
      ) {
        forceUpdate && forceUpdate();
        onUpdate && onUpdate();
      }
      previousRectRef.current = rect;
    });

    observer.observe();

    return () => {
      observer.unobserve();
    };
  }, [refElement, forceUpdate]);

  return (
    <div
      style={styles.popper}
      {...attributes.popper}
      ref={setPopperElement}
      key="dropdown-container"
      className={addClassname('o-dropdown-container', className)}
    >
      <CSSTransition
        in={open}
        classNames="o-dropdown"
        timeout={200}
        mountOnEnter={true}
        appear={false}
        unmountOnExit={true}
        onEnter={onDropStart}
        onEntering={onDropping}
        onEntered={onDropDone}
        onExit={onCollapseStart}
        onExited={onCollapseDone}
        onExiting={onCollapsing}
      >
        {children}
      </CSSTransition>
    </div>
  );
};

export default DropdownComponent;
