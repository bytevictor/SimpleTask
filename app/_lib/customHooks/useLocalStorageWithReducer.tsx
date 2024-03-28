import { Reducer, ReducerWithoutAction, useEffect, useReducer } from "react";

export default function useLocalStorageReducer(
  reducer: Reducer<any, any>,
  key: string,
  initialState: Array<any>
) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
