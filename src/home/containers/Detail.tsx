import React, {FC} from 'react';
import {View, Animated, Easing, ScrollView, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Heaader, useAnimation} from '../../ui';
import {DetailNavigationProps} from '../navigation/type';
import DetailToggleButtons from '../components/DetailToggleButtons';
import useHome from '../hooks/useHome';
import BodyDetail from '../components/BodyDetail';
import {DetailStyles as styles} from '../styles/DetailStyles';
import {section_one, section_two} from '../constants';

const DetailContainer: FC<DetailNavigationProps> = ({navigation, route}) => {
  const {item} = route.params;
  const {isInCart, addToCart, removeItemFromCart} = useHome();
  const animated_section_one = useAnimation();
  const animated_section_two = useAnimation();
  const [_, setScrollY] = React.useState(0);
  const {top} = useSafeAreaInsets();

  animated_section_two.addListener(({value}) => {
    setScrollY(value);
  });

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Animated.parallel([
        Animated.timing(animated_section_one, {
          toValue: section_one,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: false,
        }),
        Animated.timing(animated_section_two, {
          toValue: section_two,
          duration: 1000,
          easing: Easing.elastic(1),
          useNativeDriver: false,
        }),
      ]).start();
    });
    return unsubscribe;
  }, [navigation]);

  const interpolated_section_two = animated_section_two.interpolate({
    inputRange: [0, section_two],
    outputRange: [200, 0],
    extrapolate: 'clamp',
  });
  const interpolated_section_one = animated_section_one.interpolate({
    inputRange: [0, section_one],
    outputRange: [0, 0],
  });

  return (
    <View>
      <Heaader title={item.amiiboSeries} iconleft />
      <Animated.View style={styles.mainContainer}>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              height: animated_section_one,
              transform: [{translateY: interpolated_section_one}],
            },
          ]}>
          <Image
            source={{uri: item.image}}
            blurRadius={0.5}
            style={[styles.image, {top: top + 35}]}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.detailContainer,
            {
              height: animated_section_two,
              transform: [{translateY: interpolated_section_two}],
            },
          ]}>
          <View style={styles.scrollContainer}>
            <ScrollView
              style={styles.scrollviewStyle}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={12}>
              <BodyDetail item={item} />
            </ScrollView>
            <DetailToggleButtons
              add={() => addToCart(item)}
              remove={() => removeItemFromCart(item.tail)}
              quantity={isInCart(item.tail).quantity}
              isInCart={isInCart(item.tail).isInCart}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default DetailContainer;
