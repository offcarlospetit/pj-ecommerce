// hook for make animatons reusable
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '.';
import { RootState } from '../../store';
import { Product } from '../types';
import { addTocart, removeFromCart } from '../reducers/CartSlice';

const useHome = () => {
    const { data, isLoading, isError, isSuccess } = useGetProductsQuery({});
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const cartState = useSelector((state: RootState) => state.cart);

    const isInCart = useMemo(
        () => (item: string) => {
            const quantity = cartState.products.filter(
                (product: Product) => product.tail === item,
            ).length;

            return { isInCart: quantity > 0, quantity: quantity };
        },
        [cartState, page],
    );

    const memoizedData = useMemo(() => {
        let preparedData;
        if (data) {
            preparedData = data.amiibo.slice(0, 10 * page);
        }
        return preparedData;
    }, [data, page]);

    const fakeCall = () => {
        setLoading(true);
        setTimeout(() => {
            setPage(page + 1);
            setLoading(false);
        }, 1500);
    };

    const addToCart = (item: Product) => {
        dispatch(addTocart(item));
    };
    const removeItemFromCart = (tail: string) => {
        dispatch(removeFromCart(tail));
    };

    return {
        cartState,
        isInCart,
        memoizedData,
        loading,
        page,
        fakeCall,
        data,
        addToCart,
        removeItemFromCart,
        isLoading,
        isError,
        isSuccess
    };
};
export default useHome;
