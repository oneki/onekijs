import { DefaultService, reducer, service } from 'onekijs-framework';
import { ReactNode } from 'react';
import { TabsState, TabState } from './typings';

@service
export class TabsService<T = string> extends DefaultService<TabsState<T>> {
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
  enable(uid: string): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.disabled = false;
    }
  }

  @reducer
  disable(uid: string): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.disabled = true;
    }
  }

  @reducer
  hide(uid: string): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.visible = false;
    }
  }

  @reducer
  initTab(state: TabState<T>): void {
    const firstTab = Object.keys(this.state.tabs).length === 0;
    this.state.tabs[state.uid] = state;
    if (!state.disabled && state.visible && (state.active || firstTab)) {
      this.activate(state.uid);
    }
  }

  @reducer
  remove(uid: string): void {
    delete this.state.tabs[uid];
  }

  @reducer
  setClosable(uid: string, closable: boolean): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.closable = closable;
    }
  }

  @reducer
  setIcon(uid: string, icon?: ReactNode): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.icon = icon;
    }
  }

  @reducer
  setTitle(uid: string, title: T): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.title = title;
    }
  }

  @reducer
  show(uid: string): void {
    const tab = this.state.tabs[uid];
    if (tab) {
      tab.visible = true;
    }
  }
}
