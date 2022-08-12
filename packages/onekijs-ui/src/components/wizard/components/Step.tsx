import { FCC } from 'onekijs-framework';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useStep from '../hooks/useStep';
import { useWizardState } from '../hooks/useWizardState';
import { StepProps } from '../typings';
import StepTitle from './StepTitle';

const Step: FCC<StepProps> = ({
  title,
  active = false,
  disabled = false,
  visible = true,
  closable = false,
  children,
  Component = StepTitle,
  icon,
  uid,
}) => {
  const step = useStep({
    title,
    active,
    disabled,
    visible,
    closable,
    TitleComponent: Component,
    icon,
    uid: uid === undefined ? title : uid,
  });

  const onEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
  };

  const { animate } = useWizardState();

  const onEntering = (node: HTMLElement) => {
    setTimeout(() => {
      node.style.opacity = '1';
      node.style.transition = `opacity ${animate}ms ease-in-out`;
    }, 0);
  };

  if (!step || !step.active) {
    return null;
  }

  return (
    <CSSTransition in={true} timeout={animate} appear={true} onEnter={onEnter} onEntering={onEntering}>
      <div className="o-step-content">{children}</div>
    </CSSTransition>
  );
};

export default Step;
