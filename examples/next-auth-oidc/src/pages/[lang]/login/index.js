/* eslint-disable react/prop-types */
import fs from 'fs';
import {
  getI18nStaticProps,
  I18nLink,
  useLoginError,
  useOnekiRouter,
  withI18nPaths,
} from 'onekijs-next';
import path from 'path';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaAmazon } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import ItsmeIcon from '../../../component/icon/ItsmeIcon';

export async function getStaticProps(context) {
  return getI18nStaticProps(fs, path, context.params.lang);
}

export async function getStaticPaths() {
  return {
    paths: withI18nPaths(fs, path),
    fallback: false,
  };
}

const LoginPage = () => {
  const router = useOnekiRouter();
  const error = useLoginError();
  if (typeof window !== 'undefined') {
    router.saveOrigin();
  }

  // use react-hook-from to build the form
  // https://react-hook-form.com
  const { register, handleSubmit, errors } = useForm();

  return (
    <form>
      <div className="flex items-center justify-center h-screen flex-col">
        {error && (
          <div className="flex items-stretch mb-5">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold mr-2">Error!</strong>
              <span className="block sm:inline mr-10">
                {error.payload.message}{' '}
                {error.payload.code ? `(${error.payload.code})` : ''}
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => error.remove()}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-700"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          </div>
        )}

        <div className="flex items-stretch bg-gray-100 rounded-lg">
          <div className="text-white p-10">
            <p className="text-xl text-gray-700 font-bold">
              <I18nLink href="/">
                <img
                  className="h-8 w-8 cursor-pointer inline-block"
                  src="/logo.svg"
                  alt=""
                />
              </I18nLink>
              <span className="ml-4">Login</span>
            </p>
            <p className="text-base text-gray-500 mt-4">
              Basic username / password login
            </p>
            <div className="mt-6">
              <div className="max-w-4xl mx-auto">
                <label className="block">
                  <span className="block font-medium text-sm text-gray-900 leading-tight">
                    Username
                  </span>
                  <div className="mt-2">
                    <input
                      name="username"
                      className="block w-full border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white"
                      ref={register({ required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-600">
                        {' '}
                        This field is required
                      </span>
                    )}
                  </div>
                </label>
                <label className="block mt-5">
                  <span className="block font-medium text-sm text-gray-900 leading-tight">
                    Password
                  </span>
                  <div className="mt-2">
                    <input
                      name="password"
                      type="password"
                      className="block w-full border border-gray-300 rounded-lg bg-gray-100 px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white"
                      ref={register({ required: true })}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="px-0 py-5 flex justify-end">
              <SubmitButton
                label="Amplify login"
                loading={false}
                onClick={handleSubmit(data => {
                  console.log(data);
                })}
              />
              <SubmitButton
                label="Firebase login"
                loading={false}
                onClick={handleSubmit(data => {
                  console.log(data);
                })}
              />
              <SubmitButton
                label="Basic login"
                loading={false}
                onClick={handleSubmit(data => {
                  console.log(data);
                })}
              />
            </div>
          </div>
          <div className="content-center border-l-2 border-gray-200 pt-24 p-5">
            <IdpLoginButton
              name="Google"
              href="/login/google"
              className="bg-white"
              Icon={FcGoogle}
            />
            <IdpLoginButton
              name="Cognito"
              href="/login/cognito"
              className="bg-orange-200"
              Icon={FaAmazon}
            />
            <IdpLoginButton
              name="Itsme"
              href="/login/itsme"
              style={{ backgroundColor: '#e3e8e1' }}
              Icon={ItsmeIcon}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

const SubmitButton = ({ loading, label = 'Submit', onClick }) => {
  const buttonLabel = loading ? 'Loading ...' : label;
  return (
    <button
      type="button"
      className="ml-4 px-6 py-3 leading-none font-semibold rounded-lg bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900"
      onClick={() => {
        if (!loading) onClick();
      }}
    >
      {buttonLabel}
    </button>
  );
};

const IdpLoginButton = ({
  Icon,
  name,
  href = '',
  className = '',
  style = {},
}) => {
  const cls =
    'w-full active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ' +
    className;
  return (
    <div className="mt-5">
      <I18nLink href={href}>
        <button className={cls} style={style} type="button">
          <Icon style={{ width: '2em', height: '2em' }} />{' '}
          <span className="pl-2">Login with {name}</span>
        </button>
      </I18nLink>
    </div>
  );
};

export default LoginPage;
