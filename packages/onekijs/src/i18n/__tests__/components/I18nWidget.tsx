import React, { FC } from 'react';
import useI18nService from '../../useI18nService';
// import useTranslation from '../../useTranslation';

// type LogoutProps = {
//   Content?: ElementType;
// };

// const UseLogoutWidget: FC = () => {
//   const [T, t, locale, loading] = useTranslation();
//   const firstname = 'Joe';
//   return (
//     <>
//       <div>
//         <T alias="hello">
//           Hello{' '}
//           <b>
//             <i>mister</i> {{ firstname }} {{ lastname }} <i>male</i>
//           </b>{' '}
//           <u>address</u>
//         </T>
//       </div>
//       <div>
//         <T count={2}>
//           Hello{' '}
//           <b>
//             <i>mister</i> {{ firstname }} {{ lastname }} <i>male</i>
//           </b>{' '}
//           <u>address</u>
//         </T>
//       </div>
//       <div>
//         <T>Welcome {{ lastname }} on Flora</T>
//       </div>
//       <div>
//         <T>
//           Welcome {{ lastname }} on Flora. Current date = {{ date }}
//         </T>
//       </div>
//       <div title={t('Welcome')}>
//         <T>Welcome</T>
//       </div>

//       <div>
//         <T>
//           Hello{' '}
//           <b>
//             <i>mister</i> {{ firstname }} {{ lastname }} <i>male</i>
//           </b>{' '}
//           <u>address</u> <span title={t('Welcome')}>Welcome</span>
//         </T>
//       </div>
//       <div>
//         <T alias="common:user">user</T>
//       </div>
//       <div>
//         <T count={2}>user</T>
//       </div>
//     </>
//   );
// };

// const LogoutWidget: FC<LogoutProps> = ({ options }) => {
//   const [error] = useLogout(options);

//   return <>{error && <div data-testid="error-container">{error.message || error.payload?.message}</div>}</>;
// };

const I18nWidget: FC = ({ children }) => {
  const i18nService = useI18nService();
  return (
    <>
      <button data-testid="change-locale-en" onClick={() => i18nService.changeLocale('en')}>
        en
      </button>
      <button data-testid="change-locale-fr" onClick={() => i18nService.changeLocale('fr')}>
        fr
      </button>
      <div>{children}</div>
    </>
  );
};
export default I18nWidget;
