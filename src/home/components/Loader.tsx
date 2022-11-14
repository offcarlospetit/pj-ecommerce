import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {pallete} from '../../ui';

type Props = {
  loading: boolean;
};

const Loader: FC<Props> = ({loading}) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator
        animating={loading}
        size="large"
        color={pallete.secondary}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
