import { DefaultService, FCC, reducer, service } from 'onekijs-framework';
import { ReactNode } from 'react';
import { TabsState, TabState, TabTitleProps } from './typings';

@service
export class TabsService extends DefaultService<TabsState> {
  @reducer
  activate(uid: string): void {
    const tab = this.getTab(uid);
    if (tab) {
      this.state.tabs.forEach((t) => {
        t.active = false;
      });
      tab.active = true;
      this.state.active = uid;
    }
  }

  @reducer
  disable(uid: string): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.disabled = true;
    }
  }

  @reducer
  enable(uid: string): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.disabled = false;
    }
  }

  getTab(uid: string): TabState {
    return this.state.tabs[this.state.tabsIndex[uid]];
  }

  @reducer
  hide(uid: string): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.visible = false;
    }
  }

  @reducer
  initTab(state: TabState): void {
    if (!Object.keys(this.state.tabsIndex).includes(state.uid)) {
      const firstTab = this.state.tabs.length === 0;
      this.state.tabsIndex[state.uid] = this.state.tabs.length;
      this.state.tabs.push(state);
      if (!state.disabled && state.visible && (state.active || firstTab)) {
        this.activate(state.uid);
      }
    }
  }

  @reducer
  remove(uid: string): void {
    const index = this.state.tabsIndex[uid];
    delete this.state.tabsIndex[uid];
    this.state.tabs.splice(index, 1);
  }

  @reducer
  setClosable(uid: string, closable: boolean): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.closable = closable;
    }
  }

  @reducer
  setIcon(uid: string, icon?: ReactNode): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.icon = icon;
    }
  }

  @reducer
  setTitle(uid: string, title: string): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.title = title;
    }
  }

  @reducer
  setTitleComponent(uid: string, TitleComponent: FCC<TabTitleProps>): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.TitleComponent = TitleComponent;
    }
  }

  @reducer
  show(uid: string): void {
    const tab = this.getTab(uid);
    if (tab) {
      tab.visible = true;
    }
  }
}
