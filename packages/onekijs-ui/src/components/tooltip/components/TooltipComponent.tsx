import { FCC } from 'onekijs-framework';
import React, { useEffect, useId, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import { addClassname } from '../../../utils/style';
import { TooltipProps } from '../typings';

const TooltipComponent: FCC<TooltipProps> = (props) => {
  const { content, className, popperOptions, children, delayHide = 300, attachToBody, ...tooltipConfig } = props;
  const [show, setShow] = useState<boolean>(true);
  const tooltipOptions = Object.assign(
    {
      interactive: true,
      delayHide,
    },
    tooltipConfig,
  );
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip(
    tooltipOptions,
    popperOptions,
  );

  const { style: containerStyle, ...containerProps } = getTooltipProps({ className: 'o-tooltip-container' });
  const { style: arrowStyle, ...arrowProps } = getArrowProps({ className: 'o-tooltip-arrow' });
  const classNames = addClassname('o-tooltip', className);
  const uid = useId();

  useEffect(() => {
    if (visible) {
      const event = new CustomEvent<string>('tooltipVisible', {
        detail: uid,
      });
      document.dispatchEvent(event);
    }
  }, [visible, uid]);

  useEffect(() => {
    const listener = (e: any) => {
      setShow(e.detail === uid);
    };
    document.addEventListener('tooltipVisible', listener);

    return () => {
      document.removeEventListener('tooltipVisible', listener);
    };
  }, [uid]);

  const element =  (
    <div ref={setTooltipRef} style={containerStyle as React.CSSProperties} {...containerProps}>
      <div style={arrowStyle as React.CSSProperties} {...arrowProps} />
        {content}
    </div>
  )


  if (attachToBody) {
    return (
      <div ref={setTriggerRef}>
        {children}
        {show && visible && content && ReactDOM.createPortal(<div className={classNames} style={{position: 'absolute', width: '100%'}}>{element}</div>, document.body)}
      </div>
    )
  } else {
    return (
      <div className={classNames} ref={setTriggerRef}>
        {children}
        {show && visible && content && element}
      </div>
    );
  }
};

export default TooltipComponent;
