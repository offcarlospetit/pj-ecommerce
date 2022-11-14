import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Heaader} from '../../ui';
import {NavigationProps} from '../navigation/types';
import S from '../../i18n';
import {FAKE_ADDRESS, TOP} from '../constants';
import transformPrice from '../../utils';
import {CheckoutStyles as styles} from '../styles/CheckoutStyles';
import useCart from '../hooks/useCart';

type Props = {};

const Checkout: FC<Props> = ({}) => {
  const {cartState, totalPrice} = useCart();
  const navigation = useNavigation<NavigationProps>();
  const {top} = useSafeAreaInsets();

  return (
    <Container>
      <Heaader
        title={S.Cart.checkout}
        iconleft
        animated={false}
        iconright={false}
      />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {top: top + TOP}]}>
          <View style={styles.addressContainer}>
            <View style={styles.address}>
              <Text style={styles.cartTotalText}>{S.Checkout.address}</Text>
            </View>
            <View style={styles.addressLine}>
              <View style={styles.base}>
                <Text style={styles.totalText}>{FAKE_ADDRESS}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.cartItems]}>
            <Text style={styles.cartItemsText}>{S.Checkout.cart_resume}</Text>
            {cartState.products.map(item => {
              return (
                <View
                  style={styles.productsContainer}
                  key={item.tail + Math.random()}>
                  <View>
                    <Image source={{uri: item.image}} style={styles.image} />
                  </View>
                  <View style={styles.base}>
                    <Text>{item.name}</Text>
                  </View>
                  <View>
                    <Text>{transformPrice(item.price)}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.resumeContainer}>
            <View style={styles.resumeTitle}>
              <Text style={styles.cartTotalText}>{S.Cart.shop_resume}</Text>
            </View>
            <View style={styles.resumeTotalContainer}>
              <View style={styles.base}>
                <Text style={styles.totalText}>{S.Cart.total}</Text>
              </View>
              <View style={styles.totalPrice}>
                <Text style={styles.cartItemsText}>{totalPrice}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.cartTotal}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CartStack', {
                screen: 'Receipt',
              })
            }
            style={styles.base}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{S.Cart.continue_shopping}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Checkout;
