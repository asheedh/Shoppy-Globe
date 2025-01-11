import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        Items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.Items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                // If item exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // Add new item with quantity 1
                state.Items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const existingItem = state.Items.find((item) => item.id === action.payload.id);
            if (existingItem.quantity > 1) {
                // If quantity is greater than 1, decrement it
                existingItem.quantity -= 1;
            } else {
                // Otherwise, remove the item from the cart
                state.Items = state.Items.filter((item) => item.id !== action.payload.id);
            }
        },
        clearCart: (state) => {
            state.Items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
