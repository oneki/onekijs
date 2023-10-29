import { FCC } from 'onekijs-framework';
import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import useStep from '../hooks/useStep';
import { useWizardState } from '../hooks/useWizardState';
import { StepProps } from '../typings';

const Step: FCC<StepProps> = ({
  title,
  active = false,
  disabled = false,
  visible = true,
  closable = false,
  children,
  icon,
  uid,
  optional = false,
  showTitle = true,
  className,
  onTouch,
}) => {
  const { animate, forwardOnly } = useWizardState();

  const step = useStep({
    title,
    active,
    disabled,
    visible,
    closable,
    icon,
    loading: false,
    optional,
    touched: !forwardOnly,
    touching: !forwardOnly,
    uid: uid === undefined ? title : uid,
  });

  const touched = step?.touched;

  const onEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
  };

  const onEntering = (node: HTMLElement) => {
    setTimeout(() => {
      node.style.opacity = '1';
      node.style.transition = `opacity ${animate}ms ease-in-out`;
    }, 0);
  };

  useEffect(() => {
    if (touched && onTouch) {
      onTouch();
    }
  }, [touched, onTouch]);

  if (!step || !step.active) {
    return null;
  }

  return (
    <CSSTransition in={true} timeout={animate} appear={true} onEnter={onEnter} onEntering={onEntering}>
      <div className={addClassname('o-step-content', className)}>
        {showTitle && <div className="o-step-content-title">{title}</div>}
        {children}
      </div>
    </CSSTransition>
  );
};

export default Step;
