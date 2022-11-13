import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocart: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product.tail !== action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTocart, removeFromCart } = cartSlice.actions;

export default cartSlice;