import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import {Container, Heaader, pallete} from '../../ui';
import {NavigationProps} from '../navigation/types';
import useCart from '../hooks/useCart';
import S from '../../i18n';
import {FAKE_ORDER} from '../constants';
import {ReceiptStyles as styles} from '../styles/ReceiptStyles';
type Props = {};

const Receipt: FC<Props> = ({}) => {
  const navigation = useNavigation<NavigationProps>();
  const {top} = useSafeAreaInsets();
  const {totalPrice} = useCart();
  return (
    <Container>
      <Heaader title={S.Receipt.receipt} animated={false} iconright={false} />
      <View style={[styles.container, {marginTop: top + 35}]}>
        <View style={styles.sectionOneContainer}>
          <Icon name="checkcircleo" size={64} color={pallete.secondary} />
          <Text style={styles.text}>{S.Receipt.receipt_purchase}</Text>
        </View>
        <View style={styles.sectionTwoContainer}>
          <Text style={[styles.detail, {textAlign: 'center'}]}>
            {S.Receipt.receipt_number + ': '}
            <Text style={styles.orden}>{FAKE_ORDER}</Text>
          </Text>
          <Text style={styles.detail}>
            {`${S.Receipt.receipt_total_amount}: `}
            <Text style={styles.total}>{totalPrice}</Text>
          </Text>
          <Text style={styles.detail}>
            {`${S.Receipt.receipt_subtotal}: `}
            <Text style={styles.total}>{totalPrice}</Text>
          </Text>
          <Text style={styles.detail}>
            {`${S.Receipt.receipt_total}: `}
            <Text style={styles.total}>{totalPrice}</Text>
          </Text>
          <Text style={styles.detail}>
            {`${S.Receipt.receipt_payment_method}: `}
            <Text style={styles.total}>Tarjeta</Text>
          </Text>
        </View>
        <View style={styles.sectionThreeContainer}>
          <Text style={styles.date}>{`${
            S.Receipt.receipt_date
          }: ${new Date().toLocaleString()}`}</Text>
          <Text
            style={
              styles.thanks
            }>{`${S.Receipt.receipt_payment_method_message}`}</Text>
          <Text style={styles.thanks}>🎉🎉🎉🎉</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeTab')}
            style={styles.base}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{S.Receipt.receipt_button}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Receipt;
