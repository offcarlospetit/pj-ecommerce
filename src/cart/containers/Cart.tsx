import React, {FC} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Container, Divider, Heaader, pallete} from '../../ui';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EmptyCart from '../components/EmptyCart';
import {NavigationProps} from '../navigation/types';
import S from '../../i18n';
import {TOP, TOP_VALUE} from '../constants';
import {CartStyles as styles} from '../styles/CartStyles';
import useCart from '../hooks/useCart';
import transformPrice from '../../utils';

type Props = {};

const Cart: FC<Props> = ({}) => {
  const navigation = useNavigation<NavigationProps>();
  const {top, bottom} = useSafeAreaInsets();
  const {totalPrice, cartState} = useCart();
  const MARGIN_TOP = top !== 0 ? top : TOP_VALUE;

  const goToCheckout = () => {
    navigation.navigate('CartStack', {screen: 'Checkout'});
  };

  if (cartState.products.length === 0) {
    return (
      <Container>
        <Heaader
          title="Tu carrito"
          iconleft
          animated={false}
          iconright={false}
        />
        <EmptyCart />
      </Container>
    );
  }

  return (
    <Container>
      <Heaader
        title={S.Cart.your_cart}
        iconleft
        animated={false}
        iconright={false}
      />
      <View style={[styles.cartItems, {top: MARGIN_TOP + TOP}]}>
        <Text style={styles.cartItemsText}>{S.Cart.cart}</Text>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          {cartState.products.map(item => {
            return (
              <View
                style={[styles.cartItemsView]}
                key={item.tail + Math.random()}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: item.image}} style={styles.image} />
                </View>
                <View style={styles.base}>
                  <Text style={styles.textItem}>{item.name}</Text>
                </View>
                <View>
                  <Text style={styles.textItemPrice}>
                    {transformPrice(item.price)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.cartTotal}>
        <View style={styles.resumeView}>
          <Text style={styles.cartTotalText}>{S.Cart.shop_resume}</Text>
        </View>
        <View style={styles.totalResumeView}>
          <View style={styles.base}>
            <Text style={styles.totalText}>{S.Cart.total}</Text>
          </View>
          <View style={styles.totalPrice}>
            <Text style={styles.cartItemsText}>{totalPrice}</Text>
          </View>
        </View>
        <View style={[styles.buttonContainer, {bottom: bottom / 2}]}>
          <TouchableOpacity onPress={goToCheckout} style={styles.base}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{S.Cart.continue_checkout}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Cart;
