import { FCC } from 'onekijs-framework';
import React, { useCallback, useRef } from 'react';
import { addClassname } from '../../../utils/style';
import Button from '../../button';
import SubmitButton from '../../button/SubmitButton';
import Col from '../../grid/Col';
import Row from '../../grid/Row';
import { GridSize } from '../../grid/typings';
import useWizardService from '../hooks/useWizardService';
import { useWizardState } from '../hooks/useWizardState';
import { StepState, WizardProps } from '../typings';
import StepTitle from './StepTitle';

type Error = {
  stepIndex: number;
  stepTitle: string;
  errorMessage: string;
};

const WizardContainer: FCC<Omit<WizardProps, 'Component'>> = ({
  cancelLabel = 'Cancel',
  className,
  children,
  doneLabel = 'Submit',
  nextLabel = 'Next',
  onCancel,
  onDone,
  previousLabel = 'Previous',
  title,
  stepSize = 3,
  TitleComponent = StepTitle,
  TitleContentComponent,
  forwardOnly = true,
  hasSummaryStep = false,
  reviewLabel = 'Review and Submit'
}) => {
  const classNames = addClassname('o-wizard', className);
  const state = useWizardState();
  const service = useWizardService();

  const lastStepUid = service.getLastStep()?.uid;

  const activate = useCallback(
    (step: StepState) => {
      if (!step || step.disabled || (!step.touched && !step.touching)) return;
      if (!step.active) {
        service.activate(step.uid);
      }
    },
    [service],
  );

  const errorRef = useRef<Error[]>([]);
  errorRef.current = [];

  const indexRef = useRef(0);
  indexRef.current = 0;

  return (
    <Row className={classNames}>
      <Col size={stepSize} className="o-wizard-step-panel">
        {title && <div className="o-wizard-title">{title}</div>}
        {state.members.map((step) => {
          if (step.visible) {
            indexRef.current++;
          } else {
            return null;
          }
          if (step.error !== undefined) {
            errorRef.current.push({
              stepIndex: indexRef.current,
              stepTitle: step.title,
              errorMessage: step.error,
            });
          }
          return (
            <TitleComponent
              key={`step-title-${step.uid}`}
              member={step}
              onActivate={activate}
              index={indexRef.current}
              TitleContentComponent={TitleContentComponent}
            />
          );
        })}
      </Col>
      <Col size={(12 - stepSize) as GridSize} className="o-wizard-content-panel">
        <div className="o-wizard-content">
          {children}
        </div>

        <div className="o-wizard-control">
          {onCancel && (
            <Button
              kind="primary"
              pattern="flat"
              className="o-wizard-control-button"
              type="button"
              onClick={() => onCancel()}
            >
              {cancelLabel}
            </Button>
          )}
          {!service.isFirstStep() && (
            <Button
              kind="primary"
              pattern="outline"
              className="o-wizard-control-button"
              onClick={() => service.previous()}
              type="button"
            >
              {previousLabel}
            </Button>
          )}
          {!service.isLastStep() && (
            <Button
              kind={service.isCurrentStepInVisibleError() ? 'danger' : 'primary'}
              pattern="solid"
              className="o-wizard-control-button"
              disabled={service.isCurrentStepInVisibleError()}
              onClick={() => service.next()}
              type="button"
            >
              {nextLabel}
            </Button>
          )}
          {(service.isLastStep() || !forwardOnly) && (
            <SubmitButton
              kind={errorRef.current.length > 0 ? 'danger' : 'success'}
              pattern="solid"
              className="o-wizard-control-button"
              disabled={errorRef.current.length > 0}
              onClick={(hasSummaryStep && !service.isLastStep() && lastStepUid) ? () => service.activate(lastStepUid): onDone}
              type="button"
              showErrors={true}
            >
              {(hasSummaryStep && !service.isLastStep()) ? reviewLabel : doneLabel}
            </SubmitButton>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default WizardContainer;
