export {
  asyncDelete,
  asyncGet,
  asyncHttp,
  asyncPatch,
  asyncPost,
  asyncPut,
  xhr
} from "./lib/xhr";
export { SimpleError, HTTPError } from "./lib/error";
export {
  notificationService,
  useNotificationService,
  useNotifications
} from "./lib/notification";
export {
  append,
  del,
  find,
  get,
  isNull,
  isNullOrEmpty,
  set,
  shallowEqual,
  useShallowEqual,
  update
} from "./lib/utils/object";
export {
  generateCodeChallenge,
  generateCodeVerifier,
  generateNonce,
  generateState,
  getIdp,
  parseJwt,
  validateToken
} from "./lib/utils/auth";
export {
  generateRandomString
} from "./lib/utils/string";
export {
  encrypt,
  decrypt,
  sha256,
  verify
} from "./lib/utils/crypt";
export { urlBuilder, isAbsoluteUrl, absoluteUrl, toUrl, toRelativeUrl, toLocation } from "./lib/utils/url";
export {
  crudService,
  useDelete,
  useGet,
  usePatch,
  usePost,
  usePostPutPatch,
  usePut,
  useSecureDelete,
  useSecureGet,
  useSecurePatch,
  useSecurePost,
  useSecurePostPutPatch,
  useSecurePut
} from "./lib/crud";
export { every, latest, leading, debounce, throttle } from "./lib/saga";
export { secure, SecureRoute } from "./lib/secure";
export { useLocalService, createReduxService, useReduxService, useGlobalService, useGenericReducer, genericService } from "./lib/service";
export { useReduxSelector, createReduxStore } from "./lib/store";
export {
  loginService,
  useLoginService,
  useLoginCallbackService,
  useLoginError,
  logoutService,
  useLogoutService,
  useLogoutCallbackService,
  useLogoutError
} from "./lib/login";
export { authService, useAuthService, useSecurityContext } from "./lib/auth";
export { useOnekiRouter, useLocation, useHistory, useParams, useSetting, useSettings, AppContext } from "./lib/context";
export { layout, withLayout } from './lib/layout';
// export { default as Dashboard } from './components/dashboard';
// export { default as DashboardHeader } from './components/dashboard/header';
// export { default as DashboardFooter } from './components/dashboard/footer';
// export { Left as DashboardLeft } from './components/dashboard/sidebar';
// export { Right as DashboardRight } from './components/dashboard/sidebar';
// export { default as DashboardBody } from './components/dashboard/body';
// export { default as DashboardToggler } from './components/dashboard/toggler';
// export { dashboardService, useDashboardService, useDashboard } from './components/dashboard/service';
// export { Dropdown, DropdownMenu, DropdownAnchor } from './components/dropdown';
// export { Me, MeContainer } from './components/me';
// export { Search, SearchContainer } from './components/search';
export { useI18nService, i18nService, useTranslation, useLocale, useI18n, I18nLink, flattenTranslations } from './lib/i18n';
export { useGlobalState, useGlobalProp, useLocalState, useGlobalStateModifier } from './lib/state';
export { formService, useForm, FormContext, useFormContext, useField, useBind, useRule } from './lib/form';
export { Input } from './lib/form/input';
export { required, regex, email } from './lib/validation';
export { extractValidators } from './lib/utils/form';
export { default as BaseRouter } from './lib/router/base';
export { AppProvider } from './lib/app/app-provider'
export { DefaultLoadingComponent, formatSettings } from './lib/utils/app';
export { detectLocale, toI18nLocation } from './lib/utils/i18n'
export { isAsyncFunction, isAsyncOrPromise, isFalse, isFunction, isFunctionOrPromise, isPromise, isTrue } from './lib/utils/type'