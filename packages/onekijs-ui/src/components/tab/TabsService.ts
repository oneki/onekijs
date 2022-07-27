import { DefaultService, reducer, service } from 'onekijs-framework';
import { TabsState, TabState } from './typings';

@service
export class TabsService extends DefaultService<TabsState> {
  @reducer
  initTab(state: TabState): void {
    const firstTab = Object.keys(this.state.tabs).length === 0;
    this.state.tabs[state.uid] = state;
    if (!state.disabled && state.visible && (state.active || firstTab)) {
      this.activate(state.uid);
    }
  }

  @reducer
  activate(uid: string): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      Object.keys(this.state.tabs).forEach((uid) => {
        this.state.tabs[uid].active = false;
      });
      tab.active = true;
    }
  }

  @reducer
  remove(uid: string): void {
    delete this.state.tabs[uid];
  }
}
