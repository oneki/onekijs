import React from 'react'
import { simpleMergeDeep } from "./object";
import { defaultSettings } from "../settings";

export const formatSettings = (settings) => {
  let result = settings;
  if (Array.isArray(settings)) {
    result = Object.assign({}, settings[0]);
    for (let i = 1; i < settings.length; i++) {
      result = simpleMergeDeep(result, settings[i]);
    }
  }
  return Object.assign(defaultSettings, result);
}

export const DefaultLoadingComponent = () => <div>LOADING ...</div>