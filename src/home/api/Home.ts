// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Products } from '../types';

function getRandomIntInclusive() {
    const min_ = 10000;
    const max_ = 100000;
    let min = Math.ceil(min_);
    let max = Math.floor(max_);
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return new Intl.NumberFormat('es-CL', {
        currency: 'CLP',
        style: 'currency',
    }).format(result).toString();
}

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: 'prductsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.amiiboapi.com/api/',
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'amiibo/',
            providesTags: ['Products'],
            transformResponse: (response: { amiibo: Product[]; }, meta, arg) => {
                const products = response.amiibo.map((product: Product) => {
                    return {
                        ...product,
                        price: getRandomIntInclusive(),
                    };
                });
                return { amiibo: products };
            },
        }),
    }),

});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default productApi;