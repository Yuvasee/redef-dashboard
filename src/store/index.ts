import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import addressReducer from "./addressSlice";
import { bitqueryApi } from "./bitqueryApi";

const store = configureStore({
    reducer: {
        address: addressReducer,
        [bitqueryApi.reducerPath]: bitqueryApi.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
