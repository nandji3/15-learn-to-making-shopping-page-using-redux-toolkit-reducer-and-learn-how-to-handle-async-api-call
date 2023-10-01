import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: [],
        totalQuantity: 0,
    },
    reducers: {
        replaceCart(state, actions) {
            state.cartItems = actions.payload.cartItems;
            state.totalQuantity = actions.payload.totalQuantity;
        },
        addItemToCartAction(state, actions) {
            const newItem = actions.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    name: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

            state.totalQuantity++;
        },
        removeItemFromCartAction(state, actions) {
            const id = actions.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== id
                );
            } else {
                existingItem.quantity--;
            }

            state.totalQuantity--;
        },
    },
});

export const { replaceCart, addItemToCartAction, removeItemFromCartAction } =
    cartSlice.actions;
export default cartSlice.reducer;

//action creator does not return action object but instead returns another function it will receive dispatch function as a argument
