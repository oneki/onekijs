import React, { FC } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { addClassname } from '../../../utils/style';
import { TooltipProps } from '../typings';

const TooltipComponent: FC<TooltipProps> = (props) => {
  const { content, className, popperOptions, children, ...tooltipConfig } = props;
  const tooltipOptions = Object.assign(
    {
      interactive: true,
      delayHide: 500,
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

  return (
    <div className={classNames} ref={setTriggerRef}>
      {children}
      {visible && content && (
        <div ref={setTooltipRef} style={containerStyle as React.CSSProperties} {...containerProps}>
          <div style={arrowStyle as React.CSSProperties} {...arrowProps} />
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipComponent;
