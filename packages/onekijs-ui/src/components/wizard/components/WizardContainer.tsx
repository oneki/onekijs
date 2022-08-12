import { FCC } from 'onekijs-framework';
import React, { useCallback } from 'react';
import { addClassname } from '../../../utils/style';
import Col from '../../grid/Col';
import Row from '../../grid/Row';
import { GridSize } from '../../grid/typings';
import useWizardService from '../hooks/useWizardService';
import { useWizardState } from '../hooks/useWizardState';
import { StepState, WizardProps } from '../typings';

const WizardContainer: FCC<Omit<WizardProps, 'Component'>> = ({ className, children, title, stepSize = 3 }) => {
  const classNames = addClassname('o-wizard', className);
  const state = useWizardState();
  const service = useWizardService();

  const activate = useCallback(
    (step: StepState) => {
      if (!step || step.disabled) return;
      if (!step.active) {
        service.activate(step.uid);
      }
    },
    [service],
  );

  return (
    <Row className={classNames}>
      <Col size={stepSize} className="o-wizard-steps">
        {title && <div className="o-wizard-title">{title}</div>}
        {state.members.map((step) => {
          const Component = step.TitleComponent;
          return <Component key={step.uid} member={step} onActivate={activate} />;
        })}
      </Col>
      <Col size={(12 - stepSize) as GridSize} className="o-wizard-content">
        {children}
      </Col>
    </Row>
  );
};

export default WizardContainer;
