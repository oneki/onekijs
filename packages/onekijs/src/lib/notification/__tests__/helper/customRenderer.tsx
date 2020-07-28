import { render, RenderResult } from '@testing-library/react';
import React, { FC } from 'react';
import { App } from '../../../../cra/App';
import { AppSettings, AppProps } from '../../../app/typings';
import { Switch, Route } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (ui: React.ReactElement, settings: AppSettings = {}, options?: any): RenderResult => {
  const WrapperApp: FC<AppProps> = ({ children }) => {
    return (
      <App settings={settings}>
        <Switch>
          <Route>{children}</Route>
        </Switch>
      </App>
    );
  };
  return render(ui, { wrapper: WrapperApp, ...options });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
