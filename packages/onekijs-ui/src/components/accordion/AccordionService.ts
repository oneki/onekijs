import { DefaultService, reducer, service } from 'onekijs-framework';
import { AccordionState } from './typings';

@service
export class AccordionService extends DefaultService<AccordionState> {
  @reducer
  initPanel(uid: string, initialActive = false): void {
    if (this.state.panels[uid] === undefined) {
      this.state.panels[uid] = {
        uid,
        active: initialActive,
      };
    }
  }

  @reducer
  collapse(uid: string): void {
    const panel = this.state.panels[uid];
    if (panel) {
      panel.active = false;
    }
  }

  @reducer
  expand(uid: string): void {
    const panel = this.state.panels[uid];
    if (panel) {
      if (!this.state.multiActive) {
        Object.keys(this.state.panels).forEach((uid) => {
          this.state.panels[uid].active = false;
        });
      }
      panel.active = true;
    }
  }
}
