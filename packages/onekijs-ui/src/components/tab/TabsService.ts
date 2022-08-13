import { ContainerValidation, DefaultService, reducer, service, ucfirst, ValidationCode } from 'onekijs-framework';
import { ReactNode } from 'react';
import { TabsState, TabState } from './typings';

@service
export class TabsService<M extends TabState = TabState, S extends TabsState<M> = TabsState<M>> extends DefaultService<
  S
> {
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

  getMember(uid: string): M | undefined {
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
  onValidationChange(uid: string, touchedValidation: ContainerValidation, allValidation: ContainerValidation): void {
    const member = this.getMember(uid);
    if (!member) return;

    this._onValidationChange(uid, touchedValidation, true);
    this._onValidationChange(uid, allValidation, false);
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
  setError(uid: string, message: string | null): void {
    const member = this.getMember(uid);
    if (member) {
      member.error = message === null ? undefined : message;
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
  setLoading(uid: string, loading: boolean): void {
    const member = this.getMember(uid);
    if (member) {
      member.loading = loading;
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
  setWarning(uid: string, message: string | null): void {
    const member = this.getMember(uid);
    if (member) {
      member.warning = message === null ? undefined : message;
    }
  }

  @reducer
  show(uid: string): void {
    const member = this.getMember(uid);
    if (member) {
      member.visible = true;
    }
  }

  _onValidationChange(uid: string, validation: ContainerValidation, touched: boolean): void {
    const getProp = (name: string): string => {
      return touched ? `touched${ucfirst(name)}` : name;
    };

    const member = this.getMember(uid);
    if (!member) return;

    const error = getProp('error') as 'error' | 'touchedError';
    const warning = getProp('warning') as 'warning' | 'touchedWarning';

    switch (validation.code) {
      case ValidationCode.Loading:
        if (!touched) member.loading = true;
        break;
      case ValidationCode.Error:
        if (!touched) member.loading = false;
        member[error] = validation.message;
        break;
      case ValidationCode.Warning:
        if (!touched) member.loading = false;
        member[error] = undefined;
        member[warning] = validation.message;
        break;
      case ValidationCode.Ok:
      case ValidationCode.None:
        if (!touched) member.loading = false;
        member[error] = undefined;
        member[warning] = undefined;
        if (!touched) member.success = true;
        break;
    }
  }
}
