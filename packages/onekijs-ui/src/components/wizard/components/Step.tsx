import { FCC } from 'onekijs-framework';
import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { addClassname } from '../../../utils/style';
import useStep from '../hooks/useStep';
import { useWizardState } from '../hooks/useWizardState';
import { StepProps } from '../typings';
import Alert from '../../alert';

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
  help,
}) => {
  const { animate, forwardOnly } = useWizardState();
  const stepRef = useRef<HTMLDivElement | null>(null);

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

  const onEnter = () => {
    const node = stepRef.current;
    if (!node) return;
    node.style.opacity = '0';
  };

  const onEntering = () => {
    const node = stepRef.current;
    if (!node) return;
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
    <CSSTransition
      in={true}
      nodeRef={stepRef}
      timeout={animate}
      appear={true}
      onEnter={onEnter}
      onEntering={onEntering}
    >
      <div ref={stepRef} className={addClassname('o-step-content', className)}>
        {showTitle && <div className="o-step-content-title">{title}</div>}
        {help && (
          <Alert kind="info" marginBottom="lg">
            {help}
          </Alert>
        )}
        {children}
      </div>
    </CSSTransition>
  );
};

export default Step;
