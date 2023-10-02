import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCartAction(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.cartItems = action.payload.cartItems;
        },
        addItemToCartAction(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            state.totalQuantity++;
            state.changed = true;
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCartAction(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== id
                );
            } else {
                existingItem.quantity--;
                existingItem.totalPrice =
                    existingItem.totalPrice - existingItem.price;
            }
        },
    },
});

export const {
    replaceCartAction,
    addItemToCartAction,
    removeItemFromCartAction,
} = cartSlice.actions;
export default cartSlice.reducer;

//action creator does not return action object but instead returns another function it will receive dispatch function as a argument
