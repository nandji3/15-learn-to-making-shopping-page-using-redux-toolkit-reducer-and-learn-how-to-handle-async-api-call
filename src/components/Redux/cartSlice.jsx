import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialCartState,
    reducers: {
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

export const { addItemToCartAction, removeItemFromCartAction } =
    cartSlice.actions;
export default cartSlice.reducer;
