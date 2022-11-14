import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartContainer from '../containers/Cart';
import Checkout from '../containers/Checkout';

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

function CartStack() {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: true}}
        name="Cart"
        component={CartContainer}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: true}}
        name="Checkout"
        component={Checkout}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
