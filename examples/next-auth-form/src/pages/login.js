/* eslint-disable react/prop-types */
import Link from 'next/link';
import { useLoginService } from 'onekijs-next';
import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorNotification from '../component/notification/ErrorNotification';

const LoginPage = () => {
  const [error, , submit] = useLoginService();

  // use react-hook-from to build the form (https://react-hook-form.com)
  const { register, handleSubmit } = useForm();

  return (
    <form>
      <div className="flex items-center justify-center h-screen flex-col">
        {error && <ErrorNotification error={error} />}

        <div className="flex items-stretch bg-gray-100 rounded-lg w-2/4">
          <div className="text-white p-10 w-full">
            <LoginHeader />
            <div className="mt-6">
              <div className="max-w-4xl mx-auto">
                <LoginField
                  name="username"
                  label="Username"
                  type="text"
                  register={register}
                />
                <div className="mt-5" />
                <LoginField
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                />
              </div>
            </div>
            <LoginSubmit onSubmit={handleSubmit(submit)} />
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

const LoginHeader = () => {
  return (
    <>
      <p className="text-xl text-gray-700 font-bold">
        <img
          className="h-8 w-8 cursor-pointer inline-block"
          src="/logo.svg"
          alt=""
        />
        <span className="ml-4">Basic username / password login</span>
      </p>
      <p className="text-gray-500 text-sm mt-5">
        <b>User</b>: user / user
        <br />
        <b>Admin</b>: admin / admin
      </p>
    </>
  );
};

const LoginField = ({ label, name, type, register }) => {
  return (
    <label className="block">
      <span className="block font-medium text-sm text-gray-900 leading-tight">
        {label}
      </span>
      <div className="mt-2">
        <input
          name={name}
          type={type}
          className="text-black block w-full border border-gray-300 rounded-lg px-3 py-2 leading-tight focus:outline-none focus:border-gray-600 focus:bg-white"
          ref={register}
        />
      </div>
    </label>
  );
};

const LoginSubmit = ({ onSubmit }) => {
  return (
    <div className="px-0 py-5 flex justify-end">
      <Link href="/">
        <a className="text-black mt-2">Cancel</a>
      </Link>
      <SubmitButton label="Submit" loading={false} onClick={onSubmit} />
    </div>
  );
};

export default LoginPage;
