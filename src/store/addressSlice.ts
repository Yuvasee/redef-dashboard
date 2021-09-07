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
            state.value = state.value.trim();
            state.isSubmitted = true;
            state.isValid = isAddress(state.value);
        },
        clear() {
            return initialState;
        },
    },
});

export const { setValue, submit, clear } = addressSlice.actions;
export default addressSlice.reducer;
