import React, {FC} from 'react';
import {FlatList, Image, StatusBar, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TouchableScale from 'react-native-touchable-scale';
import {Product} from '../types';
import {Container, Heaader} from '../../ui';
import {HomeScreenNavigationProp} from '../navigation/type';
import S from '../../i18n';
import useHome from '../hooks/useHome';
import {HomeStyles as styles} from '../styles/HomeStyles';
import transformPrice from '../../utils';
import Footer from '../components/Footer';
import ToggleButtons from '../components/ToggleButtons';
import Loader from '../components/Loader';

const Home: FC<HomeScreenNavigationProp> = ({navigation}) => {
  const {
    memoizedData,
    loading,
    isInCart,
    fakeCall,
    addToCart,
    removeItemFromCart,
    isLoading,
  } = useHome();
  const {top} = useSafeAreaInsets();

  const footerRender = () => {
    return loading ? <Footer loading={loading} /> : null;
  };

  const navigateToDetail = (item: Product) =>
    navigation.navigate('DetailStack', {
      screen: 'Detail',
      params: {item},
    });

  const renderItem = ({item}: {item: Product}) => {
    return (
      <TouchableScale
        activeScale={0.9}
        tension={20}
        friction={7}
        useNativeDriver
        style={styles.base}
        onPress={() => navigateToDetail(item)}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.image}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detail}>
            <Text>{item.name}</Text>
            <Text>{transformPrice(item.price)}</Text>
          </View>
          <ToggleButtons
            add={() => addToCart(item)}
            remove={() => removeItemFromCart(item.tail)}
            quantity={isInCart(item.tail).quantity}
            isInCart={isInCart(item.tail).isInCart}
          />
        </View>
      </TouchableScale>
    );
  };

  return (
    <Container>
      <StatusBar hidden />
      <Heaader title={S.Home.home} />
      <View style={{marginTop: top}}>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <FlatList
            numColumns={2}
            extraData={memoizedData}
            data={memoizedData}
            onEndReached={fakeCall}
            onEndReachedThreshold={0.1}
            ListFooterComponent={footerRender}
            renderItem={renderItem}
          />
        )}
      </View>
    </Container>
  );
};

export default Home;
