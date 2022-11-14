// hook for make animatons reusable
import { useMemo, useRef } from 'react';
import { Product } from '../../home/types';
import { RootState } from '../../store';
import transformPrice from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../reducers/CartSlice';

const useCart = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state: RootState) => state.cart);
    const totalPrice = useMemo(() => {
        const totalPriceValue = cartState.products.reduce((acc: number, item) => {
            return acc + item.price;
        }, 0);
        return transformPrice(totalPriceValue);
    }, [cartState.products]);

    const setClearCart = () => {
        dispatch(clearCart());
    };

    return {
        cartState,
        totalPrice,
        setClearCart,
    };
};
export default useCart;