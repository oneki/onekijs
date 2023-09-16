import { DefaultService, reducer, service } from 'onekijs-framework';
import { AccordionState } from './typings';

@service
export class AccordionService extends DefaultService<AccordionState> {
  @reducer
  initPanel(uid: string, initialActive = false, initialExpand = false): void {
    if (this.state.panels[uid] === undefined) {
      this.state.panels[uid] = {
        uid,
        active: initialActive,
        expanded: initialExpand,
      };
    }
  }

  @reducer
  activate(uid: string): void {
    const panel = this.state.panels[uid];
    if (panel) {
      Object.keys(this.state.panels).forEach((uid) => {
        this.state.panels[uid].active = false;
      });
      panel.active = true;
    }
  }

  @reducer
  collapse(uid: string): void {
    const panel = this.state.panels[uid];
    if (panel) {
      panel.active = false;
      panel.expanded = false;
    }
  }

  @reducer
  expand(uid: string): void {
    const panel = this.state.panels[uid];
    if (panel) {
      Object.keys(this.state.panels).forEach((uid) => {
        this.state.panels[uid].active = false;
        if (!this.state.multiExpand) {
          this.state.panels[uid].expanded = false;
        }
      });
      panel.expanded = true;
      panel.active = true;
    }
  }
}
