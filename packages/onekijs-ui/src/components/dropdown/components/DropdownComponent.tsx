import React, { FC, useState } from 'react';
import { DropdownProps } from '../typings';
import { sameWidthPopperModifier } from '../../../utils/popper';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';

const DropdownComponent: FC<DropdownProps> = ({ className, refElement, open, children }) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(refElement, popperElement, {
    modifiers: [sameWidthPopperModifier],
  });

  return (
    <CSSTransition
      in={open}
      timeout={500}
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

export default DropdownComponent;
