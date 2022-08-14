import { DefaultFormContext, FCC, useFieldContainer } from 'onekijs-framework';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import useStep from '../hooks/useStep';
import useWizardService from '../hooks/useWizardService';
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
}) => {
  const { animate, forwardOnly } = useWizardState();
  const service = useWizardService();

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

  const fieldContainer = useFieldContainer({
    onValidationChange: (_field, _validation, touchedValidation, allValidation) => {
      if (step) {
        service.onValidationChange(step.uid, touchedValidation, allValidation);
      }
    },
  });

  const onEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
  };

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
    <DefaultFormContext.Provider value={fieldContainer.context}>
      <CSSTransition in={true} timeout={animate} appear={true} onEnter={onEnter} onEntering={onEntering}>
        <div className="o-step-content">{children}</div>
      </CSSTransition>
    </DefaultFormContext.Provider>
  );
};

export default Step;
