import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { IUser } from "@/types";

type Action = {
  type: "LOGIN" | "LOGOUT";
  value?: any;
};

interface State {
  userData: IUser | null;
}

const initialState: State = {
  userData: JSON.parse(localStorage.getItem("userData") || "null"),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userData", JSON.stringify(action.value));
      return {
        ...state,
        userData: action.value,
      };
    case "LOGOUT":
      localStorage.removeItem("userData");
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  appState: State;
  dispatchApp: React.Dispatch<Action>;
}>({
  appState: initialState,
  dispatchApp: () => null,
});

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [appState, dispatchApp] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appState, dispatchApp }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext musi być używany w AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
