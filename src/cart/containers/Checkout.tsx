import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootState} from '../../store';
import {Container, Heaader, height, pallete, width} from '../../ui';

type Props = {};

const Checkout: FC<Props> = (props: Props) => {
  const cartState = useSelector((state: RootState) => state.cart);
  const navigation = useNavigation();
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

  return (
    <Container>
      <Heaader title="Tu carrito" iconleft animated={false} iconright={false} />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, top: top + 35, paddingHorizontal: 16}}>
          <View style={{flex: 1, marginTop: 16}}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <Text style={styles.cartTotalText}>Direccion de envio</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={styles.totalText}>Avenida Beauchef 1325</Text>
              </View>
            </View>
          </View>
          <View style={[styles.cartItems]}>
            <Text style={styles.cartItemsText}>Resumen del carrito</Text>
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
          </View>
          <View style={{flex: 1, marginTop: 16}}>
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
          </View>
        </View>
      </ScrollView>
      <View style={styles.cartTotal}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
          }}>
          <TouchableOpacity style={{flex: 1}}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Pagar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Checkout;

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
