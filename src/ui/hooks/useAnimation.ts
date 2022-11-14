// hook for make animatons reusable
import { useRef } from 'react';
import { Animated } from 'react-native';

const useAnimation = () => {
    const animation = useRef(new Animated.Value(0)).current;
    return animation;
};
export default useAnimation;