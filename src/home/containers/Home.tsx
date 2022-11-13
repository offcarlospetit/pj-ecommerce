import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {useGetProductsQuery} from '../hooks';
import Icon from 'react-native-vector-icons/AntDesign';
import {addTocart, CartState, removeFromCart} from '../reducers/CartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../types';
import {RootState} from '../../store';

type Props = {};

function getRandomIntInclusive() {
  const min_ = 10000;
  const max_ = 100000;
  let min = Math.ceil(min_);
  let max = Math.floor(max_);
  const result = Math.floor(Math.random() * (max - min + 1) + min);
  return new Intl.NumberFormat('es-CL', {
    currency: 'CLP',
    style: 'currency',
  }).format(result);
}

const Home: FC<Props> = ({}) => {
  const {data, refetch} = useGetProductsQuery({});
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
    <SafeAreaView>
      <View>
        {/* <Button title='Add to cart' onPress={} /> */}
        <Text>Home</Text>
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
                  <Text>{item.price}</Text>
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
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
