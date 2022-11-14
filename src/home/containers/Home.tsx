import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {useGetProductsQuery} from '../hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {addTocart, removeFromCart} from '../reducers/CartSlice';
import TouchableScale from 'react-native-touchable-scale';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../types';
import {RootState} from '../../store';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../../navigation/TabNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DetailStackParamList} from '../navigation/DetailStack';
import {RootNavigationParamList} from '../../navigation/RootNavigation';
import {Container, Heaader} from '../../ui';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HomeScreenNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'HomeTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<DetailStackParamList, 'Detail'>,
    NativeStackScreenProps<RootNavigationParamList, 'DetailStack'>
  >
>;

const Home: FC<HomeScreenNavigationProp> = ({navigation}) => {
  const {data, refetch} = useGetProductsQuery({});
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const cartState = useSelector((state: RootState) => state.cart);

  const memoizedData = useMemo(() => {
    let preparedData;
    if (data) {
      preparedData = data.amiibo.slice(0, 10 * page);
    }
    return preparedData;
  }, [data, page]);

  const isInCart = useMemo(
    () => (item: string) => {
      const quantity = cartState.products.filter(
        (product: Product) => product.tail === item,
      ).length;

      return {isInCart: quantity > 0, quantity: quantity};
    },
    [cartState, page],
  );

  const fakeCall = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(page + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <Container>
      <StatusBar hidden />
      <Heaader title="Home" />
      <View style={{marginTop: top}}>
        <FlatList
          numColumns={2}
          extraData={memoizedData}
          data={memoizedData}
          onEndReached={fakeCall}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => {
            return loading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : null;
          }}
          renderItem={({item}: {item: Product}) => {
            return (
              // product view card
              <TouchableScale
                activeScale={0.9}
                tension={20}
                friction={7}
                useNativeDriver
                style={{flex: 1}}
                onPress={() =>
                  navigation.navigate('DetailStack', {
                    screen: 'Detail',
                    params: {item},
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      source={{uri: item.image}}
                      style={{width: 100, height: 100}}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{flex: 2}}>
                    <Text>{item.name}</Text>
                    <Text>{item.formatPrice}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      paddingVertical: 10,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => dispatch(addTocart(item))}
                      style={{marginRight: 10}}>
                      <Icon name="pluscircleo" size={18} color={'#497174'} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        paddingHorizontal: 4,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#D6E4E5',
                      }}>
                      {isInCart(item.tail).isInCart
                        ? isInCart(item.tail).quantity
                        : '0'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => dispatch(removeFromCart(item.tail))}
                      style={{marginLeft: 10}}>
                      <Icon name="minuscircleo" size={18} color={'#EB6440'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableScale>
            );
          }}
        />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
