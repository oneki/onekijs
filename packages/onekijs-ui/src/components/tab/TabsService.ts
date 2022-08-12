import { DefaultService, FCC, reducer, service } from 'onekijs-framework';
import { ReactNode } from 'react';
import { TabsState, TabState, TabTitleProps } from './typings';

@service
export class TabsService<S extends TabsState = TabsState, M extends TabState = TabState> extends DefaultService<S> {
  @reducer
  activate(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      this.state.members.forEach((t) => {
        t.active = false;
      });
      member.active = true;
      this.state.active = uid;
    }
  }

  @reducer
  disable(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.disabled = true;
    }
  }

  @reducer
  enable(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.disabled = false;
    }
  }

  getMember(uid: string): TabState {
    return this.state.members[this.state.membersIndex[uid]];
  }

  @reducer
  hide(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.visible = false;
    }
  }

  @reducer
  initMember(state: M): void {
    if (!Object.keys(this.state.membersIndex).includes(state.uid)) {
      const firstTab = this.state.members.length === 0;
      this.state.membersIndex[state.uid] = this.state.members.length;
      this.state.members.push(state);
      if (!state.disabled && state.visible && (state.active || firstTab)) {
        this.activate(state.uid);
      }
    }
  }

  @reducer
  remove(uid: string): void {
    const index = this.state.membersIndex[uid];
    delete this.state.membersIndex[uid];
    this.state.members.splice(index, 1);
  }

  @reducer
  setClosable(uid: string, closable: boolean): void {
    const member = this.getMember(uid);
    if (member) {
      member.closable = closable;
    }
  }

  @reducer
  setIcon(uid: string, icon?: ReactNode): void {
    const member = this.getMember(uid);
    if (member) {
      member.icon = icon;
    }
  }

  @reducer
  setTitle(uid: string, title: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.title = title;
    }
  }

  @reducer
  setTitleComponent(uid: string, TitleComponent: FCC<TabTitleProps>): void {
    const member = this.getMember(uid);
    if (member) {
      member.TitleComponent = TitleComponent;
    }
  }

  @reducer
  show(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.visible = true;
    }
  }
}
