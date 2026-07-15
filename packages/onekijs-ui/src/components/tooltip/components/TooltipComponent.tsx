import { FCC } from 'onekijs-framework';
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { useEffect, useId, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { addClassname } from '../../../utils/style';
import { TooltipProps } from '../typings';

const TooltipComponent: FCC<TooltipProps> = (props) => {
  const { content, className, placement = 'top', children, delayHide = 300, delayShow = 200, attachToBody } = props;
  const [show, setShow] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const { context, floatingStyles, middlewareData, refs } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(8), flip(), shift({ padding: 8 }), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });
  const { getFloatingProps, getReferenceProps } = useInteractions([
    useHover(context, { delay: { open: delayShow, close: delayHide } }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: 'tooltip' }),
  ]);
  const classNames = addClassname('o-tooltip', className);
  const uid = useId();

  useEffect(() => {
    if (open) {
      const event = new CustomEvent<string>('tooltipVisible', {
        detail: uid,
      });
      document.dispatchEvent(event);
    }
  }, [open, uid]);

  useEffect(() => {
    const listener = (e: any) => {
      setShow(e.detail === uid);
    };
    document.addEventListener('tooltipVisible', listener);

    return () => {
      document.removeEventListener('tooltipVisible', listener);
    };
  }, [uid]);

  const element = (
    <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps({ className: 'o-tooltip-container' })}>
      <div
        ref={arrowRef}
        className="o-tooltip-arrow"
        style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
      />
      {content}
    </div>
  );

  if (attachToBody) {
    return (
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
        {show && open && content && ReactDOM.createPortal(<div className={classNames}>{element}</div>, document.body)}
      </div>
    );
  } else {
    return (
      <div className={classNames} ref={refs.setReference} {...getReferenceProps()}>
        {children}
        {show && open && content && element}
      </div>
    );
  }
};

export default TooltipComponent;
