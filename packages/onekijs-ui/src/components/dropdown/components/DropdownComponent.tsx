import { FCC, useIsomorphicLayoutEffect, useThrottle } from 'onekijs-framework';
import { autoPlacement, autoUpdate, flip, offset, size, useFloating, type Placement } from '@floating-ui/react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import { DropdownComponentProps } from '../typings';

const DropdownComponent: FCC<DropdownComponentProps> = ({
  animationTimeout = 0,
  attachToBody = false,
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
  fallbackPlacements,
  width,
  widthModifier = 'same',
  zIndex = 1,
}) => {
  const autoPlacementEnabled = placement?.startsWith('auto') ?? false;
  const normalizedFallbackPlacements = fallbackPlacements?.filter((item) => !item.startsWith('auto')) as
    | Placement[]
    | undefined;
  const { floatingStyles, refs, update: updatePosition } = useFloating({
    placement: autoPlacementEnabled ? undefined : (placement as Placement | undefined),
    middleware: [
      offset({ crossAxis: skidding, mainAxis: distance }),
      autoPlacementEnabled
        ? autoPlacement({ allowedPlacements: normalizedFallbackPlacements })
        : flip({ fallbackPlacements: normalizedFallbackPlacements }),
      size({
        apply({ elements, rects }) {
          if (widthModifier === 'same') elements.floating.style.width = `${rects.reference.width}px`;
          if (widthModifier === 'min') elements.floating.style.minWidth = `${rects.reference.width}px`;
          if (widthModifier === 'max') elements.floating.style.maxWidth = `${rects.reference.width}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const triggerZIndexRef = useRef<string | undefined>(undefined);

  const update = useCallback(() => {
    updatePosition();
    onUpdate && onUpdate();
  }, [updatePosition, onUpdate]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const throttleUpdate = useThrottle(update, 20);

  const resizeObserver = useMemo(() => {
    return new ResizeObserver(() => {
      throttleUpdate();
    });
  }, [throttleUpdate]);

  useIsomorphicLayoutEffect(() => {
    const el = refElement;
    refs.setReference(el || null);
    if (el) {
      resizeObserver.observe(el);
    }
    return () => {
      if (el) {
        resizeObserver.unobserve(el);
      }
    };
  }, [refElement, refs, updatePosition]);

  useIsomorphicLayoutEffect(() => {
    if (open) {
      setTimeout(update, 0);
    }
  }, [open, update]);

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
      node.style.transform = '';
      if (refElement !== null && refElement !== undefined) {
        refElement.style.zIndex = triggerZIndexRef.current || '';
      }
      if (onDropDone) {
        onDropDone(node, isAppearing);
      }
    },
    [onDropDone, refElement],
  );

  const onEntering = useCallback(
    (node: HTMLElement, isAppearing: boolean) => {
      node.style.transform = 'translateY(-40px)';
      node.style.opacity = '0';
      node.style.transition = `transform ${animationTimeout}ms ease-out, opacity ${animationTimeout}ms ease-out`;
      setTimeout(() => {
        node.style.opacity = '1';
        node.style.transform = 'translateY(0px)';
      }, 0);
      if (onDropping) {
        onDropping(node, isAppearing);
      }
    },
    [onDropping, animationTimeout],
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

  const onExiting = useCallback(
    (node: HTMLElement) => {
      node.style.opacity = '1';
      node.style.transform = 'translateY(0px)';
      node.style.transition = `transform ${animationTimeout}ms ease-in, opacity ${animationTimeout}ms ease-in`;
      setTimeout(() => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(-40px)';
      }, 0);
      if (onCollapsing) {
        onCollapsing(node);
      }
    },
    [onCollapsing, animationTimeout],
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

  const element = (
    <div
      style={Object.assign({ width }, floatingStyles)}
      ref={refs.setFloating}
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
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
      >
        <div className="o-dropdown">{children}</div>
      </CSSTransition>
    </div>
  );

  if (attachToBody) {
    return <>{ReactDOM.createPortal(element, document.body)}</>;
  } else {
    return <>{element}</>;
  }
};

export default DropdownComponent;
