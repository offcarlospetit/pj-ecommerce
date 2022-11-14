import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {height, pallete, width} from '../../ui';
import S from '../../i18n';
import {ToggleProps} from '../types';

const BOTTOM = 0.9;

const DetailToggleButtons: FC<ToggleProps> = ({
  add,
  remove,
  quantity,
  isInCart,
}) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <View style={[styles.toggleTitle, {marginBottom: bottom * BOTTOM}]}>
          <Text style={styles.toggleTitleText}>{S.Detail.add_to_cart}</Text>
        </View>
        <View
          style={[
            styles.toggleButtonsContainer,
            {marginBottom: bottom * BOTTOM},
          ]}>
          <TouchableOpacity onPress={add} style={styles.buttonPlus}>
            <Icon name="pluscircleo" size={36} color={pallete.secondary} />
          </TouchableOpacity>
          <Text style={styles.toggleButtonsCounter}>{quantity}</Text>
          <TouchableOpacity onPress={remove} style={styles.buttonMinus}>
            <Icon
              name="minuscircleo"
              size={36}
              color={isInCart ? pallete.primary : pallete.gray}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailToggleButtons;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width,
    height: (1 / 8) * height,
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  toggleContainer: {
    flex: 1,
    backgroundColor: pallete.fourth,
    padding: 16,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    shadowColor: pallete.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  toggleTitleText: {
    fontSize: 22,
    fontWeight: '800',
    fontStyle: 'italic',
    color: pallete.secondary,
  },
  toggleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toggleButtonsCounter: {
    paddingHorizontal: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: pallete.third,
  },
  buttonPlus: {marginRight: 10},
  buttonMinus: {marginLeft: 10},
});
