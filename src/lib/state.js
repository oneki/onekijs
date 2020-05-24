import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useReduxService } from "./service";
import { set, get } from "./utils/object";

const service = {
  name: "state",
  reducers: {
    setState: (state, payload) => {
      set(state, payload.key, payload.value);
    }
  }
}

const defaultSelector = (state) => state;

export const useGlobalState = (selector) => {
  const state = useSelector(selector || defaultSelector);
  const stateService = useReduxService(service);
  const setState = useCallback((key, value) => {
    stateService.setState({ key, value })
  }, [stateService]);
  return [state, setState]
}

export const useGlobalProp = (key, defaultValue) => {
  let value = useSelector(state => get(state, key));
  value = value === undefined ? defaultValue : value;
  const stateService = useReduxService(service);
  const setValue = useCallback(value => {
    stateService.setState({ key, value })
  }, [stateService, key]);
  return [value, setValue]
}

