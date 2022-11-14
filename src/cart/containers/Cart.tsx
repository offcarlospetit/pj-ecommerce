import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useMemo} from 'react';
import {Container, Heaader, height, pallete, width} from '../../ui';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import Icon from 'react-native-vector-icons/AntDesign';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabParamList} from '../../navigation/TabNavigation';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DetailStackParamList} from '../../home/navigation/DetailStack';
import {RootNavigationParamList} from '../../navigation/RootNavigation';
import {CartStackParamList} from '../navigation/CartStack';

type Props = {};

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'HomeTab'>,
  CompositeNavigationProp<
    CompositeNavigationProp<
      NativeStackNavigationProp<DetailStackParamList, 'Detail'>,
      NativeStackNavigationProp<RootNavigationParamList, 'DetailStack'>
    >,
    CompositeNavigationProp<
      NativeStackNavigationProp<CartStackParamList, 'Cart'>,
      NativeStackNavigationProp<RootNavigationParamList, 'CartStack'>
    >
  >
>;

const Cart: FC<Props> = (props: Props) => {
  const cartState = useSelector((state: RootState) => state.cart);
  const navigation = useNavigation<NavigationProps>();
  const {top, bottom} = useSafeAreaInsets();
  const totalPrice = useMemo(() => {
    const totalPriceValue = cartState.products.reduce((acc: any, item) => {
      return acc + item.price;
    }, 0);
    return new Intl.NumberFormat('es-CL', {
      currency: 'CLP',
      style: 'currency',
    }).format(totalPriceValue);
  }, [cartState.products]);

  const goToCheckout = () => {
    navigation.navigate('CartStack', {screen: 'Checkout'});
  };
  return (
    <Container>
      <Heaader title="Tu carrito" iconleft animated={false} iconright={false} />
      <View style={[styles.cartItems, {top: top + 35}]}>
        <Text style={styles.cartItemsText}>Resumen del carrito</Text>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          {cartState.products.map(item => {
            return (
              <View
                style={{
                  padding: 8,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 8,
                }}
                key={item.tail}>
                <View>
                  <Image source={{uri: item.image}} style={styles.image} />
                </View>
                <View style={{flex: 1}}>
                  <Text>{item.name}</Text>
                </View>
                <View>
                  <Text>{item.formatPrice}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.cartTotal}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <Text style={styles.cartTotalText}>Resumen de tu compra</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.totalText}>Total</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.cartItemsText}>{totalPrice}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            bottom: bottom / 2,
          }}>
          <TouchableOpacity onPress={goToCheckout} style={{flex: 1}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Continuar con tu pedido</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Cart;

const styles = StyleSheet.create({
  goBack: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: pallete.black,
  },
  cartResume: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartResumeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItems: {
    flex: 5,
    paddingHorizontal: 16,
  },
  cartItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartTotal: {
    bottom: 0,
    position: 'absolute',
    height: height * 0.18,
    backgroundColor: pallete.white,
    shadowColor: pallete.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: width,
    padding: 16,
  },
  cartTotalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderWidth: 1,
  },
  totalText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: pallete.primary,
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: pallete.white,
    fontWeight: 'bold',
  },
});
