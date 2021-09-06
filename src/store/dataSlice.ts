import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DataSlice = {
    address: string;
};

const initialState = {
    address: "",
} as DataSlice;

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
    },
});

export const { setAddress } = dataSlice.actions;
export default dataSlice.reducer;
