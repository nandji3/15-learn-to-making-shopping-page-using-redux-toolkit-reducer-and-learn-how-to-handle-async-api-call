import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartShow: false,
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialCartState,
    reducers: {
        cartShowHideAction(state) {
            state.cartShow = !state.cartShow;
        },
    },
});

export const { cartShowHideAction } = cartSlice.actions;
export default cartSlice.reducer;
