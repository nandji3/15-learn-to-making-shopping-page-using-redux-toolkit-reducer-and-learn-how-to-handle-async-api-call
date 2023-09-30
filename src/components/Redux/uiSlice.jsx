import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
    cartIsVisible: false,
};

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: initialUiState,
    reducers: {
        toggleCartAction(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
    },
});

export const { toggleCartAction } = uiSlice.actions;
export default uiSlice.reducer;
