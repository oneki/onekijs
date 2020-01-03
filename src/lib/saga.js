import {
  takeEvery,
  takeLatest,
  takeLeading,
  takeMaybe
} from "redux-saga/effects";

export const every = saga => ({
  effect: takeEvery,
  saga
});

export const latest = saga => ({
  effect: takeLatest,
  saga
});

export const leading = saga => ({
  effect: takeLeading,
  saga
});

export const maybe = saga => ({
  effect: takeMaybe,
  saga
});
