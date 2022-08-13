import { reducer, service } from 'onekijs-framework';
import { TabsService } from '../tab/TabsService';
import { StepState, WizardState } from './typings';

@service
export class WizardService extends TabsService<StepState, WizardState> {
  @reducer
  activate(uid: string): void {
    super.activate(uid);
    if (this.state.active) {
      this.touched(this.state.active);
    }
  }

  @reducer
  activateNext(): void {
    for (let i = this.getCurrentActiveIndex() + 1; i < this.state.members.length; i++) {
      const step = this.state.members[i];
      if (step && step.visible && !step.disabled) {
        this.activate(step.uid);
        return;
      }
    }
  }

  @reducer
  activatePrevious(): void {
    for (let i = this.getCurrentActiveIndex() - 1; i >= 0; i--) {
      const step = this.state.members[i];
      if (step && step.visible && !step.disabled) {
        this.activate(step.uid);
        return;
      }
    }
  }

  getCurrentActiveIndex(): number {
    return this.state.members.findIndex((m) => m.uid === this.state.active);
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

  @reducer
  touched(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.touched = true;
    }
  }
}
