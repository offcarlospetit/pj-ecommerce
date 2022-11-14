import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootNavigationParamList} from '../../navigation/RootNavigation';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  useNavigation,
} from '@react-navigation/native';
import {DetailStackParamList} from '../navigation/DetailStack';
import {Heaader, pallete, useAnimation, width, height} from '../../ui';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {addTocart, removeFromCart} from '../reducers/CartSlice';
import {RootState} from '../../store';
import {Product} from '../types';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../../navigation/TabNavigation';
import {CartStackParamList} from '../../cart';
// import S from '../../i18n';
// import {RecipetEnum} from '../i18n/keys';

type Props = CompositeScreenProps<
  NativeStackScreenProps<DetailStackParamList, 'Detail'>,
  NativeStackScreenProps<RootNavigationParamList, 'DetailStack'>
>;

const section_one = height * 0.4;
const section_two = height * 0.6;

const DetailContainer: FC<Props> = ({navigation, route}) => {
  const {item} = route.params;
  const animated_section_one = useAnimation();
  const dispatch = useDispatch();
  const animated_section_two = useAnimation();
  const [scrollY, setScrollY] = React.useState(0);
  const {top, bottom} = useSafeAreaInsets();
  const cartState = useSelector((state: RootState) => state.cart);

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

  const isInCart = useMemo(
    () => (item: string) => {
      console.log({item, cartState: cartState.products});
      const quantity = cartState.products.filter(
        (product: Product) => product.tail === item,
      ).length;

      return {isInCart: quantity > 0, quantity: quantity};
    },
    [cartState],
  );

  return (
    <View>
      <Heaader title={item.amiiboSeries} iconleft />
      <Animated.View
        style={{
          position: 'absolute',
          width,
          height,
        }}>
        <Animated.View
          style={{
            width,
            backgroundColor: pallete.fourth,
            borderBottomStartRadius: 5,
            borderBottomEndRadius: 5,
            position: 'absolute',
            top: 0,
            zIndex: 1,
            height: animated_section_one,
            transform: [{translateY: interpolated_section_one}],
          }}>
          <Image
            source={{uri: item.image}}
            blurRadius={0.5}
            style={[styles.image, {top: top + 35}]}
          />
        </Animated.View>
        <Animated.View
          style={{
            height: animated_section_two,
            width,
            transform: [{translateY: interpolated_section_two}],
            backgroundColor: 'white',
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            position: 'absolute',
            bottom: 0,
            zIndex: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View style={{flex: 1}}>
            <ScrollView
              style={{flexGrow: 1}}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={12}
              // onScroll={e => {
              //   if (
              //     e.nativeEvent.contentOffset.y > 0 &&
              //     e.nativeEvent.contentOffset.y < top * 3.617
              //   )
              //     animated_section_two.setValue(
              //       section_two + e.nativeEvent.contentOffset.y,
              //     );
              // }}
            >
              <View style={{flex: 1, paddingBottom: 24}}>
                <View style={{flex: 1, padding: 16, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontStyle: 'italic',
                        fontWeight: '800',
                        color: pallete.secondary,
                      }}>
                      {item.amiiboSeries}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '800',
                        color: pallete.secondary,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '800',
                        color: pallete.black,
                      }}>
                      {item.formatPrice}
                    </Text>
                  </View>
                </View>
                {/* divider */}
                <View
                  style={{
                    borderWidth: 1,
                    marginHorizontal: 16,
                    borderColor: pallete.gray,
                    marginVertical: 16,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 8,
                    paddingLeft: 16,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{color: pallete.black50, fontWeight: '700'}}>
                      {'Caracter: '}
                    </Text>
                    <Text style={{color: pallete.black, fontWeight: '400'}}>
                      {item.character}
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{color: pallete.black50, fontWeight: '700'}}>
                      {'Serie : '}
                    </Text>
                    <Text style={{color: pallete.black, fontWeight: '400'}}>
                      {item.gameSeries}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 8,
                    paddingLeft: 16,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{color: pallete.black50, fontWeight: '700'}}>
                      {'Head : '}
                    </Text>
                    <Text style={{color: pallete.black, fontWeight: '400'}}>
                      {item.head}
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{color: pallete.black50, fontWeight: '700'}}>
                      {'Nombre : '}
                    </Text>
                    <Text style={{color: pallete.black, fontWeight: '400'}}>
                      {item.name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 8,
                    paddingLeft: 16,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{color: pallete.black50, fontWeight: '700'}}>
                      {'Typo : '}
                    </Text>
                    <Text style={{color: pallete.black, fontWeight: '400'}}>
                      {item.type}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                width,
                height: (1 / 8) * height,
                paddingHorizontal: 0,
                marginBottom: 0,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: pallete.fourth,
                  padding: 16,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    marginBottom: bottom * 0.9,
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: '800',
                      fontStyle: 'italic',
                      color: pallete.secondary,
                    }}>
                    Añadir al carrito
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginBottom: bottom * 0.9,
                  }}>
                  <TouchableOpacity
                    onPress={() => dispatch(addTocart(item))}
                    style={{marginRight: 10}}>
                    <Icon
                      name="pluscircleo"
                      size={36}
                      color={pallete.secondary}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      paddingHorizontal: 4,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#D6E4E5',
                    }}>
                    {isInCart(item.tail).isInCart
                      ? isInCart(item.tail).quantity
                      : '0'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item.tail))}
                    style={{marginLeft: 10}}>
                    <Icon
                      name="minuscircleo"
                      size={36}
                      color={pallete.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default DetailContainer;

const styles = StyleSheet.create({
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
  },
});
