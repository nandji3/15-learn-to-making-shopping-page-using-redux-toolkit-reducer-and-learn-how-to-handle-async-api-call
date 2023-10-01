import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
    cartIsVisible: false,
    notification: null,
};

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: initialUiState,
    reducers: {
        toggleCartAction(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, actions) {
            console.log("Inside Redux Action -->", actions.payload);
            state.notification = {
                status: actions.payload.status,
                title: actions.payload.title,
                message: actions.payload.message,
            };
        },
    },
});

export const { toggleCartAction, showNotification } = uiSlice.actions;
export default uiSlice.reducer;
