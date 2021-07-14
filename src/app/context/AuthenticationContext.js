import { createContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = AuthenticationContext.Provider;

export const AuthenticationConsumer = AuthenticationContext.Consumer;
