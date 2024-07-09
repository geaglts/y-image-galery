import { createContext } from "preact";
import { useReducer, useContext } from "preact/hooks";
import { Loading } from "../components/Loading";

const GlobalContext = createContext(null);
const GlobalDispatchContext = createContext(null);

const initialState = {
  isLoading: false,
};

function stateReducer(state, action) {
  switch (action.type) {
    case "toggleLoading": {
      return { ...state, isLoading: !state.isLoading };
    }
    default:
      return state;
  }
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function useGlobalDispatch() {
  return useContext(GlobalDispatchContext);
}

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {state.isLoading && <Loading />}
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  );
}
