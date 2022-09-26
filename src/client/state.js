/**
 * Client state
 * Components wrapped in StateProvider have access to global actions and state
 * via `useGlobalState` hook.
 * @exports useGlobalState
 * @exports GlobalStateProvider
 */

import React, {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { ReactChild } from 'types';
import { parseCookies } from 'nookies';

// Cookie
export const cookies = Object.freeze({
  banner: 'calibrate-health-banner-dismissed',
});

// Actions
const NAV = 'NAV';
const BANNER = 'BANNER';
const PREVROUTE = 'PREVROUTE';

// Context
const GlobalStateContext = createContext();

// State
const initialState = {
  navOpen: false,
  bannerShown: false,
  prevRoute: '',
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case NAV:
      return {
        ...state,
        navOpen: action.payload,
      };
    case BANNER:
      return {
        ...state,
        bannerShown: action.payload,
      };
    case PREVROUTE:
      return {
        ...state,
        prevRoute: action.payload,
      };
    default:
      return state;
  }
};

// Hook
export function useGlobalState() {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setNavOpen = useCallback((bool) => {
    dispatch({
      type: NAV,
      payload: bool,
    });
  }, [dispatch]);

  const setBannerShown = useCallback((bool) => {
    dispatch({
      type: BANNER,
      payload: bool,
    });
  }, [dispatch]);

  const setPrevRoute = useCallback((string) => {
    dispatch({
      type: PREVROUTE,
      payload: string,
    });
  }, [dispatch]);

  const actions = {
    setNavOpen,
    setBannerShown,
    setPrevRoute,
  };

  return [state, actions];
}

// Provider
export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const userCookies = parseCookies();

    dispatch({
      type: BANNER,
      payload: !userCookies.hasOwnProperty(cookies.banner),
    });
  }, []);

  const globalState = useMemo(() => ([state, dispatch]), [state, dispatch]);

  return (
    <GlobalStateContext.Provider value={globalState}>
      {children}
    </GlobalStateContext.Provider>
  );
}

GlobalStateProvider.propTypes = {
  children: ReactChild.isRequired,
};
