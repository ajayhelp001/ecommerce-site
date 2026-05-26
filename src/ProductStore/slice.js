import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
    item: cartFromStorage,
    totalPrice: 0,
}

export const slice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        add(state, action) {
            state.item.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state.item));
        },
        removeCart(state, action) {
            state.item = state.item.filter(
                (item) => String(item.productId) !== String(action.payload)
            );
            localStorage.setItem("cart", JSON.stringify(state.item));
        },
        setCartTotal: (state, action) => {
            state.totalPrice = action.payload
        }
    }
})
export const { add, removeCart, setCartTotal } = slice.actions;
export default slice.reducer;