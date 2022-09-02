import { reducer, saga, SagaEffect, service } from 'onekijs-framework';
import { TabsService } from '../tab/TabsService';
import { StepState, WizardState } from './typings';

@service
export class WizardService<
  M extends StepState = StepState,
  S extends WizardState<M> = WizardState<M>,
> extends TabsService<M, S> {
  @reducer
  activateNext(): void {
    const nextStep = this.getNextStep();
    if (nextStep) {
      this.activate(nextStep.uid);
    }
  }

  @reducer
  activatePrevious(): void {
    const previousStep = this.getPreviousStep();
    if (previousStep) {
      this.activate(previousStep.uid);
    }
  }

  getCurrentStep(): M | undefined {
    return this.state.members[this.getCurrentActiveIndex()];
  }

  getNextStep(): M | undefined {
    for (let i = this.getCurrentActiveIndex() + 1; i < this.state.members.length; i++) {
      const step = this.state.members[i];
      if (step && step.visible && !step.disabled) {
        return step;
      }
    }
    return undefined;
  }

  getPreviousStep(): M | undefined {
    for (let i = this.getCurrentActiveIndex() - 1; i >= 0; i--) {
      const step = this.state.members[i];
      if (step && step.visible && !step.disabled) {
        return step;
      }
    }
    return undefined;
  }

  isFirstStep(): boolean {
    if (this.state.active) {
      return this.state.members.filter((m) => m.visible)[0]?.uid === this.state.active;
    }
    return false;
  }

  isLastStep(): boolean {
    if (this.state.active) {
      return this.state.members.filter((m) => m.visible && !m.disabled).slice(-1)[0]?.uid === this.state.active;
    }
    return false;
  }

  isCurrentStepInError(): boolean {
    if (this.state.active) {
      const currentStep = this.getMember(this.state.active);
      return currentStep?.error !== undefined;
    }
    return false;
  }

  isCurrentStepInVisibleError(): boolean {
    if (this.state.active) {
      const currentStep = this.getMember(this.state.active);
      return currentStep?.touchingError !== undefined;
    }
    return false;
  }

  @saga(SagaEffect.Leading)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  *done() {
    yield this.setSubmitting(true);
    if (this.state.onDone) {
      yield this.state.onDone();
    }
    yield this.setSubmitting(false);
  }

  @reducer
  next(): void {
    if (this.isCurrentStepInError()) {
      const currentStep = this.getCurrentStep();
      if (currentStep) {
        this.touched(currentStep.uid);
      }
    } else {
      let result = true;
      if (this.state.onNext) {
        result = this.state.onNext(this.getCurrentStep() as M, this.getNextStep() as M);
      }
      if (result) {
        this.activateNext();
      }
    }
  }

  @reducer
  previous(): void {
    let result = true;
    if (this.state.onPrevious) {
      result = this.state.onPrevious(this.getCurrentStep() as M, this.getPreviousStep() as M);
    }
    if (result) {
      this.activatePrevious();
    }
  }

  @reducer
  setSubmitting(submitting: boolean): void {
    this.state.submitting = submitting;
  }
}
