import { eventLocks, FCC, useEventListener } from 'onekijs-framework';
import React, { useContext, useId, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ThemeContext } from 'styled-components';
import { useClickOutside } from '../../../utils/event';
import { addClassname } from '../../../utils/style';
import { ModalProps } from '../typings';

const ModalComponent: FCC<ModalProps> = ({
  attachToBody = false,
  className,
  children,
  open,
  animationDuration = 150,
  closeIcon = true,
  onClose,
  onClosed,
  title,
  buttons = [],
  closeOnClickOutside,
  closeOnEscape = true,
}) => {
  const id = useId();
  const theme = useContext(ThemeContext);
  const maskOpacity = theme.modal.maskOpacity;
  const ref = useRef<HTMLDivElement | null>(null);

  const onEntering = (node: HTMLElement): void => {
    eventLocks.lock('escape', id);
    node.style.opacity = '0';
    node.style.transition = `opacity ${animationDuration}ms ease-out`;
    if (ref.current) {
      ref.current.style.transform = 'translateY(-40px)';
      ref.current.style.transition = `transform ${animationDuration}ms ease-out`;
    }
    setTimeout(() => {
      node.style.opacity = maskOpacity;
      if (ref.current) {
        ref.current.style.transform = 'translateY(0px)';
      }
    }, 0);
  };

  const onExiting = (node: HTMLElement): void => {
    node.style.opacity = maskOpacity;
    node.style.transition = `opacity ${animationDuration}ms ease-out`;
    if (ref.current) {
      ref.current.style.transform = 'translateY(0px)';
      ref.current.style.transition = `transform ${animationDuration}ms ease-out`;
    }
    setTimeout(() => {
      node.style.opacity = '0';
      if (ref.current) {
        ref.current.style.transform = 'translateY(-40px)';
      }
    }, 0);
  };

  const onEntered = (node: HTMLElement): void => {
    node.style.opacity = '';
    node.style.transition = '';
    if (ref.current) {
      ref.current.style.transition = '';
      ref.current.style.transform = '';
    }
  };

  const onExited = (node: HTMLElement): void => {
    eventLocks.unlock('escape', id);
    node.style.opacity = '';
    node.style.transition = '';
    if (ref.current) {
      ref.current.style.transition = '';
      ref.current.style.transform = '';
    }
    if (onClosed) {
      onClosed();
    }
  };

  useClickOutside(ref, () => {
    if (closeOnClickOutside) {
      onClose && onClose();
    }
  });

  useEventListener('keydown', (e) => {
    if (closeOnEscape && e.key === 'Escape' && eventLocks.isLockedBy('escape', id)) {
      onClose && onClose();
    }
  });

  const element = (
    <CSSTransition
      in={open}
      classNames="o-modal"
      timeout={animationDuration}
      unmountOnExit={true}
      onEntering={onEntering}
      onEntered={onEntered}
      onExiting={onExiting}
      onExited={onExited}
    >
      <div className={addClassname('o-modal', className)}>
        <div ref={ref} className="o-modal-dialog">
          {closeIcon && (
            <span onClick={onClose} className="o-modal-close-icon">
              &#10006;
            </span>
          )}
          {title && <div className="o-modal-header">{title}</div>}
          <div className="o-modal-content">{children}</div>
          {buttons.length > 0 && (
            <div className="o-modal-footer">
              {buttons.map((b, index) => (
                <span key={`button-${index}`} className="o-modal-button">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </CSSTransition>
  );

  if (attachToBody) {
    return <>{ReactDOM.createPortal(element, document.body)}</>;
  } else {
    return <>{element}</>;
  }
};

export default ModalComponent;
