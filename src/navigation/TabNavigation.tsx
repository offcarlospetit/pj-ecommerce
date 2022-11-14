import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {Home} from '../home';
import {pallete} from '../ui';

export type TabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();
Icon;
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: pallete.primary,
          tabBarInactiveTintColor: pallete.black50,
        }}
        name="HomeTab"
        component={Home}
      />
    </Tab.Navigator>
  );
}
