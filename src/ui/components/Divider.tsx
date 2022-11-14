import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {pallete} from '../theme';

type Props = {};

const Divider: FC<Props> = ({}) => {
  return <View style={styles.container} />;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginHorizontal: 16,
    borderColor: pallete.gray,
    marginVertical: 16,
  },
});
