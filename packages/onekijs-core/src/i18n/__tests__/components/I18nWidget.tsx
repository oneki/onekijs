import React, { FC } from 'react';
import useI18nService from '../../useI18nService';
import useTranslation from '../../useTranslation';

export type I18nWidgetProps = {
  lastname?: string;
  firstname?: string;
  date?: Date;
  ns?: string[];
};

const I18nWidget: FC<I18nWidgetProps> = ({ lastname, firstname, date, ns = [] }) => {
  // const I18nWidget: FC<I18nWidgetProps> = () => {
  const i18nService = useI18nService();
  // const [T, , , loading] = useTranslation('users');
  const [T, t, , loading] = useTranslation(ns);
  if (loading) return null;
  return (
    <>
      <button data-testid="change-locale-en" onClick={() => i18nService.changeLocale('en')}>
        en
      </button>
      <button data-testid="change-locale-fr" onClick={() => i18nService.changeLocale('fr')}>
        fr
      </button>
      <div>
        <div data-testid="test1">
          <T>Welcome</T>
        </div>
        <div data-testid="test2">
          <T alias="welcome">Dummy text</T>
        </div>
        <div data-testid="test3">
          <T>Welcome {{ lastname }} on my website</T>
        </div>
        <div data-testid="test4">
          <T>
            Welcome {{ lastname }} on my website. Current date = {{ date }}
          </T>
        </div>
        <div data-testid="test5">
          <T>
            Welcome <b>{{ lastname }}</b> {{ firstname }}
          </T>
        </div>
        <div data-testid="test6">
          <T alias="hello">
            Hello{' '}
            <span>
              <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
            </span>{' '}
            <b>address</b>
          </T>
        </div>
        <div data-testid="test7">
          <T count={2} alias="hello">
            Hello{' '}
            <span>
              <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
            </span>{' '}
            <b>address</b>
          </T>
        </div>
        <div data-testid="test8">
          <T>
            Hello{' '}
            <span>
              <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
            </span>{' '}
            <b>address</b>
          </T>
        </div>
        <div data-testid="test9">
          <T count={2}>
            Hello{' '}
            <span>
              <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
            </span>{' '}
            <b>address</b>
          </T>
        </div>
        <div data-testid="test10">
          <T>
            Hello{' '}
            <span className="container">
              <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
            </span>{' '}
            <b>address</b>
          </T>
        </div>
        <div data-testid="test11">{t('Welcome')}</div>
        <div data-testid="test12">{t('Dummy', 'welcome')}</div>
        <div data-testid="test13">{t(<>Welcome {{ lastname }} on my website</>)}</div>
        <div data-testid="test14">
          {t(
            <>
              Welcome {{ lastname }} on my website. Current date = {{ date }}
            </>,
          )}
        </div>
        <div data-testid="test15">
          {t(
            <>
              Hello{' '}
              <span>
                <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
              </span>{' '}
              <b>address</b>
            </>,
            'hello',
          )}
        </div>
        <div data-testid="test16">
          {t(
            <>
              Hello{' '}
              <span>
                <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
              </span>{' '}
              <b>address</b>
            </>,
            'hello',
            2,
          )}
        </div>
        <div data-testid="test17">
          <T>
            Hello{' '}
            <span>
              <b>mister</b> {{ firstname }} {{ lastname }} <i>male</i>
            </span>{' '}
            <b>address</b> <span title={t('Welcome')}>Welcome</span>
          </T>
        </div>
        <div data-testid="test18">
          <T alias="user">Dummy</T>
        </div>
        <div data-testid="test19">
          <T alias="user" count={2}>
            Dummy
          </T>
        </div>
        <div data-testid="test20">
          <T alias="common:user">user</T>
        </div>
        <div data-testid="test21">
          <T alias="common:user" count={2}>
            Dummy
          </T>
        </div>
        <div data-testid="test22">
          <T>common:user</T>
        </div>
        <div data-testid="test23">
          <T alias="common:user">common:user</T>
        </div>
      </div>
    </>
  );
};
export default I18nWidget;
