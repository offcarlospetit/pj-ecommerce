import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {pallete} from '../../ui';

type Props = {};

const EmptyCart: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your cart is empty</Text>
      <Icon name="frowno" size={64} color={pallete.gray} />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
