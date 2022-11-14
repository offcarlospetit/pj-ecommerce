import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {pallete} from '../theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../../navigation/TabNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParamList} from '../../cart';
import {RootNavigationParamList} from '../../navigation/RootNavigation';
import {DetailStackParamList} from '../../home/navigation/DetailStack';

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

interface Props {
  title?: string;
  textColor?: string;
  iconleft?: boolean;
  iconright?: boolean;
  animated?: boolean;
}

const Header: FC<Props> = ({
  title,
  textColor = pallete.black50,
  iconleft = false,
  iconright = true,
  animated = true,
}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();
  const cartState = useSelector((state: RootState) => state.cart);
  const animated_header_bar = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animated_header_bar, {
      toValue: top,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: false,
    }).start();
  }, []);
  const interpolated_header_bar = animated_header_bar.interpolate({
    inputRange: [0, top],
    outputRange: [0, top - 10],
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: animated ? animated_header_bar : top + 35,
          transform: [{translateY: animated ? interpolated_header_bar : 0}],
        },
      ]}>
      <View style={styles.goBack}>
        <Pressable onPress={() => (iconleft ? navigation?.goBack() : null)}>
          <Icon
            name="leftcircleo"
            size={26}
            color={iconleft ? textColor : pallete.transparent}
          />
        </Pressable>
      </View>
      <View style={styles.title}>
        <Text style={{color: textColor, fontSize: 24}}>{title}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          onPress={() =>
            iconright
              ? navigation?.navigate('CartStack', {screen: 'Cart'})
              : null
          }>
          <View style={{marginRight: 10}}>
            <Icon
              name="shoppingcart"
              size={34}
              color={iconright ? textColor : pallete.transparent}
            />
          </View>
          {cartState.products.length > 0 && iconright && (
            <View style={styles.indicartorCart}>
              <Text style={{color: pallete.white, fontSize: 8}}>
                {cartState.products.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    zIndex: 10000,
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  goBack: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  indicartorCart: {
    position: 'absolute',
    borderRadius: 15 / 2,
    backgroundColor: pallete.primary,
    padding: 3,
    width: 15,
    height: 15,
    marginTop: 0,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
