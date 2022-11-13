import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

export interface CartState {
    products: Product[];
}

const initialState: CartState = {
    products: [],
};

function removeObjectWithId(arr: Array<Product>, tail: string) {
    const objWithIdIndex = arr.findIndex((obj) => obj.tail === tail);
    arr.splice(objWithIdIndex, 1);

    return arr;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addTocart: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.products = removeObjectWithId(state.products, action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addTocart, removeFromCart } = cartSlice.actions;

export default cartSlice;