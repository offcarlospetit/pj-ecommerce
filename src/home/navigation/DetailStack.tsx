import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailContainer from '../containers/Detail';
import {Product} from '../types';

export type DetailStackParamList = {
  Detail: {item: Product};
};

const Stack = createNativeStackNavigator<DetailStackParamList>();

function DetailStack() {
  return (
    <Stack.Navigator
      initialRouteName="Detail"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: true}}
        name="Detail"
        component={DetailContainer}
      />
    </Stack.Navigator>
  );
}

export default DetailStack;
