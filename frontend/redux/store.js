import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const reducer = (state, action) => {
  if (action.type === HYDRATE)
    return {
      ...state,
      ...action.payload,
    };
  return rootReducer(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware({ serializableCheck: false }),
  });

export const wrapper = createWrapper(makeStore);
