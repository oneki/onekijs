import { AppState, DefaultLoadingComponent, FCC, useLazyRef } from 'onekijs-framework';
import React, { FC, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactRouter } from './router/ReactRouter';
import { useRouterSync } from './router/useRouterSync';
import { AppProps } from './typings';

const AppRouterSync: FC = () => {
  useRouterSync();
  return null;
};

const AppRouter: FCC = ({ children }) => {
  return (
    <BrowserRouter>
      <AppRouterSync />
      {children}
    </BrowserRouter>
  );
};

const FCCApp: FCC<AppProps> = ({ LoadingComponent = DefaultLoadingComponent, children, ...props }) => {
  const router = useLazyRef<ReactRouter>(() => {
    return new ReactRouter();
  });
  return (
    <AppState {...props} router={router.current}>
      <AppRouter>
        <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
      </AppRouter>
    </AppState>
  );
};

/**
 * `<App/>` is the main component that bootstraps the **_Oneki.js framework_** on top of **_Create React App_**
 *
 * This component is generally the external component of an application and is responsible for:
 * - creating a Redux store:
 *   - If the `store` property is present, **_App_** doesn't create a Redux store but uses the one referenced by the property.
 *   - Otherwise, **&lt;App/&gt;** creates the Redux store. The initial state of the store is the object referenced by the property `initialState`.
 * - creating a React Router. By default, it creates a **BrowserRouter** that can be changed / configured via the **settings.ts** file
 * - creating and injecting global **services** in the Redux store
 * - creating a context that contains three elements:
 *   - **router**: accessible via useRouter()
 *   - **settings**: accessible via useSettings()
 *   - **redux store**: accessible via useStore()
 *
 * #### Custom redux store
 *
 * A custom Redux store can be created by calling the helper `createReduxStore` from Oneki.js
 *
 * ```ts
 * const store = createReduxStore((initialState = {}), (middlewares = []));
 * ```
 * This helper expects an initial state and an array of Redux middlewares.
 *
 * @group Application
 * @category Components
 */
export const App = React.memo(FCCApp);
App.displayName = 'App';
