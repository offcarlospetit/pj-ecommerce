import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import DetailStack, {
  DetailStackParamList,
} from '../home/navigation/DetailStack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {CartStack, CartStackParamList} from '../cart';

export type RootNavigationParamList = {
  TabNavigator: undefined;
  DetailStack: NavigatorScreenParams<DetailStackParamList>;
  CartStack: NavigatorScreenParams<CartStackParamList>;
};

const Stack = createNativeStackNavigator<RootNavigationParamList>();

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabNavigator" component={TabNavigation} />
        <Stack.Screen
          options={{headerShown: false}}
          name="DetailStack"
          component={DetailStack}
        />
        <Stack.Screen
          options={{headerShown: false, presentation: 'modal'}}
          name="CartStack"
          component={CartStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
