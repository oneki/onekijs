import observeRect from '@reach/observe-rect';
import { FCC, useIsomorphicLayoutEffect } from 'onekijs-framework';
import React, { useCallback, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { sameWidthPopperModifier } from '../../../utils/popper';
import { addClassname } from '../../../utils/style';
import { DropdownComponentProps } from '../typings';

const DropdownComponent: FCC<DropdownComponentProps> = ({
  animationTimeout = 0,
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
  placement = 'auto',
  zIndex = 1000,
}) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { forceUpdate, styles, attributes } = usePopper(refElement, popperElement, {
    placement,
    modifiers: [
      sameWidthPopperModifier,
      {
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
      {
        name: 'flip',
        enabled: placement === 'auto',
      },
    ],
  });
  const previousRectRef = useRef<DOMRect>();
  const triggerZIndexRef = useRef<string>();

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

  const classNames = addClassname(`o-dropdown-${open ? 'open' : 'close'}`, className);

  const onEnter = useCallback(
    (node: HTMLElement, isAppearing: boolean) => {
      if (refElement !== null && refElement !== undefined) {
        triggerZIndexRef.current = refElement.style.zIndex;
        refElement.style.zIndex = `${zIndex + 1}`;
      }
      if (onDropStart) {
        onDropStart(node, isAppearing);
      }
    },
    [onDropStart, refElement, zIndex],
  );

  const onEntered = useCallback(
    (node: HTMLElement, isAppearing: boolean) => {
      if (refElement !== null && refElement !== undefined) {
        refElement.style.zIndex = triggerZIndexRef.current || '';
      }
      if (onDropDone) {
        onDropDone(node, isAppearing);
      }
    },
    [onDropDone, refElement],
  );

  const onExit = useCallback(
    (node: HTMLElement) => {
      if (refElement !== null && refElement !== undefined) {
        refElement.style.zIndex = `${zIndex + 1}`;
      }
      if (onCollapseStart) {
        onCollapseStart(node);
      }
    },
    [onCollapseStart, refElement, zIndex],
  );

  const onExited = useCallback(
    (node: HTMLElement) => {
      if (refElement !== null && refElement !== undefined) {
        refElement.style.zIndex = triggerZIndexRef.current || '';
      }
      if (onCollapseDone) {
        onCollapseDone(node);
      }
    },
    [onCollapseDone, refElement],
  );

  return (
    <div
      style={styles.popper}
      {...attributes.popper}
      ref={setPopperElement}
      key="dropdown-container"
      className={addClassname('o-dropdown-container', classNames)}
    >
      <CSSTransition
        in={open}
        classNames="o-dropdown"
        timeout={animationTimeout}
        mountOnEnter={true}
        appear={false}
        unmountOnExit={true}
        onEnter={onEnter}
        onEntering={onDropping}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
        onExiting={onCollapsing}
      >
        <div className="o-dropdown">{children}</div>
      </CSSTransition>
    </div>
  );
};

export default DropdownComponent;
