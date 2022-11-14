import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {pallete} from '../../ui';
import {ToggleProps} from '../types';

const ToggleButtons: FC<ToggleProps> = ({add, remove, quantity, isInCart}) => {
  return (
    <View style={styles.addRemoveContainer}>
      <TouchableOpacity onPress={add} style={styles.buttonPlus}>
        <Icon name="pluscircleo" size={18} color={pallete.secondary} />
      </TouchableOpacity>
      <Text style={styles.counter}>{quantity}</Text>
      <TouchableOpacity onPress={remove} style={styles.buttonMinus}>
        <Icon
          name="minuscircleo"
          size={18}
          color={isInCart ? pallete.primary : pallete.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButtons;

const styles = StyleSheet.create({
  addRemoveContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  counter: {
    paddingHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: pallete.fourth,
  },
  buttonPlus: {marginRight: 10},
  buttonMinus: {marginLeft: 10},
});
