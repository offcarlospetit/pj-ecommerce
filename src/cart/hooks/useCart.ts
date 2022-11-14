// hook for make animatons reusable
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import transformPrice from '../../utils';

const useCart = () => {
    const cartState = useSelector((state: RootState) => state.cart);
    const totalPrice = useMemo(() => {
        const totalPriceValue = cartState.products.reduce((acc: number, item) => {
            return acc + item.price;
        }, 0);
        return transformPrice(totalPriceValue);
    }, [cartState.products]);

    return {
        cartState,
        totalPrice,
    };
};
export default useCart;