import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartContainer from '../containers/Cart';
import Checkout from '../containers/Checkout';
import Receipt from '../containers/Receipt';

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
  Receipt: undefined;
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
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: true}}
        name="Receipt"
        component={Receipt}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
