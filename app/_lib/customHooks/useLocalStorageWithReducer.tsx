import { Reducer, ReducerWithoutAction, useEffect, useReducer } from "react";
import useLocalStorage from "./useLocalStorageV2";

export default function useLocalStorageReducer(
  reducer: Reducer<any, any>,
  key: string,
  initialState: Array<any>
) {
  const [savedState, setSavedState] = useLocalStorage(key, initialState);

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const persisted = localStorage?.getItem(key);

    return persisted ? JSON.parse(persisted) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
