import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Heaader, height, pallete, width} from '../../ui';
import {NavigationProps} from '../navigation/types';
import S from '../../i18n';
import {FAKE_ADDRESS, TOP} from '../constants';
import useHome from '../../home/hooks/useHome';
import transformPrice from '../../utils';

type Props = {};

const Checkout: FC<Props> = ({}) => {
  const {cartState} = useHome();
  const navigation = useNavigation<NavigationProps>();
  const {top} = useSafeAreaInsets();
  const totalPrice = useMemo(() => {
    const totalPriceValue = cartState.products.reduce((acc: any, item) => {
      return acc + item.price;
    }, 0);
    return new Intl.NumberFormat('es-CL', {
      currency: 'CLP',
      style: 'currency',
    }).format(totalPriceValue);
  }, [cartState.products]);

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

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  addressContainer: {
    flex: 1,
    marginTop: 16,
  },
  address: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addressLine: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  goBack: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  productsContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
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
    flex: 1,
    marginTop: 16,
  },
  cartItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartTotal: {
    bottom: 0,
    position: 'absolute',
    height: height * 0.14,
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
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 24,
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
  resumeContainer: {flex: 1, marginTop: 16},
  resumeTitle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  resumeTotalContainer: {flex: 1, flexDirection: 'row'},
  totalPrice: {flex: 1, alignItems: 'flex-end'},
});
