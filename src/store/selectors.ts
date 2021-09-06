import { createSelector } from "@reduxjs/toolkit";

import { RootState } from ".";

const selectSelf = (state: RootState) => state;

export const selectAddress = createSelector(selectSelf, (state) => state.address.value);
export const selectAddressShowError = createSelector(selectSelf, (state) => {
    const { isSubmitted, isValid } = state.address;
    return isSubmitted && !isValid;
});
export const selectAddressIsValid = createSelector(selectSelf, (state) => state.address.isValid);
