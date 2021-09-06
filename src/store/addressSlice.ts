import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAddress } from "ethers/lib/utils";

type DataSlice = {
    value: string;
    isSubmitted: boolean;
    isValid: boolean;
};

const initialState: DataSlice = {
    value: "",
    isSubmitted: false,
    isValid: false,
};

const addressSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setValue(state, action: PayloadAction<string>) {
            state.value = action.payload;
            state.isSubmitted = false;
        },
        submit(state) {
            state.isSubmitted = true;
            state.isValid = isAddress(state.value);
        },
    },
});

export const { setValue, submit } = addressSlice.actions;
export default addressSlice.reducer;
