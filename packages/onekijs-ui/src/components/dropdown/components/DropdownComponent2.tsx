import { FCC } from 'onekijs-framework';
import React, { useState } from 'react';
import DropdownContent from '../DropdownContent';
import DropdownTrigger from '../DropdownTrigger';
import { DropdownProps } from '../typings';
import DropdownComponent from './DropdownComponent';

const DropdownComponent2: FCC<DropdownProps> = ({ children, ...props }) => {
  let triggerElement = null;
  let contentElement = null;

  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) {
      return;
    }

    if (element.type === DropdownTrigger) {
      triggerElement = element.props.children;
    }

    if (element.type === DropdownContent) {
      contentElement = element.props.children;
    }
  });

  return (
    <span style={{ display: 'inline-block', position: 'relative' }} ref={setContainerRef}>
      {triggerElement}
      <DropdownComponent {...props} refElement={containerRef}>
        {contentElement}
      </DropdownComponent>
    </span>
  );
};

export default DropdownComponent2;
