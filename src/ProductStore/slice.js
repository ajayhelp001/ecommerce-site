import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage =
    JSON.parse(localStorage.getItem('cart')) || [];

const cartSummaryFromStorage =
    JSON.parse(localStorage.getItem('cartSummary')) || {
        subtotal: 0,
        shipping: 0,
        discount: 0,
        total: 0,
        coupon: ''
    };

const initialState = {
    item: cartFromStorage,
    totalPrice: 0,
    cartSummary: cartSummaryFromStorage,
    deliveryOptions: {
        sameDayDelivery: false,
        localPickup: false,
    }
};

export const slice = createSlice({
    name: 'cart',
    initialState,

    reducers: {

        add(state, action) {

            const existingProduct = state.item.find(
                (item) => 
                    String(item.productId) ===
                    String(action.payload.productId)
            );

            if (existingProduct) {

                existingProduct.quantity += 1;

                existingProduct.itemTotalPrice =
                    existingProduct.quantity *
                    Number(existingProduct.productOfferPrice);

            } else {

                state.item.push({
                    ...action.payload,
                    quantity: 1,
                    itemTotalPrice:
                        Number(action.payload.productOfferPrice)
                });

            }

            localStorage.setItem(
                'cart',
                JSON.stringify(state.item)
            );
        },

        removeCart(state, action) {

            state.item = state.item.filter( (item) =>  String(item.productId) !==  String(action.payload)  );

            localStorage.setItem(
                "cart",
                JSON.stringify(state.item)
            );
        },

        setCartTotal(state, action) {

            state.totalPrice = action.payload;
        },

        updateQuantity(state, action) {

            const { productId, quantity } =
                action.payload;

            const product = state.item.find(
                (item) =>
                    String(item.productId) ===
                    String(productId)
            );

            if (product) {

                product.quantity = quantity;

                product.itemTotalPrice =
                    quantity *
                    Number(product.productOfferPrice);
            }

            localStorage.setItem(
                'cart',
                JSON.stringify(state.item)
            );
        },

        setCartSummary(state, action) {

            state.cartSummary = action.payload;

            localStorage.setItem(
                'cartSummary',
                JSON.stringify(action.payload)
            );
        }




    }
});

export const {
    add,
    removeCart,
    setCartTotal,
    updateQuantity,
    setCartSummary
} = slice.actions;

export default slice.reducer;