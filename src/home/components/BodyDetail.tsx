import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Product} from '../types';
import {Divider, pallete} from '../../ui';
import S from '../../i18n';
import transformPrice from '../../utils';
import {BodyDetailStyles as styles} from '../styles/DetailStyles';

type Props = {
  item: Product;
};

const BodyDetail: FC<Props> = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.base}>
          <Text style={styles.containerHeaderTitle}>{item.amiiboSeries}</Text>
          <Text style={styles.containerHeaderName}>{item.name}</Text>
        </View>
        <View style={styles.containerHeaderPrice}>
          <Text style={styles.containerHeaderPriceText}>
            {transformPrice(item.price)}
          </Text>
        </View>
      </View>
      {/* divider */}
      <Divider />
      <View style={styles.containerDetail}>
        <View style={styles.baseView}>
          <Text style={styles.containerDetailText}>
            {`${S.Detail.character}: `}
          </Text>
          <Text style={styles.containerDetailTextItem}>{item.character}</Text>
        </View>
        <View style={styles.baseView}>
          <Text style={styles.containerDetailText}>
            {`${S.Detail.serie}: `}
          </Text>
          <Text style={styles.containerDetailTextItem}>{item.gameSeries}</Text>
        </View>
      </View>
      <View style={styles.containerDetailItems}>
        <View style={styles.baseView}>
          <Text style={styles.containerDetailText}>{`${S.Detail.head}: `}</Text>
          <Text style={styles.containerDetailTextItem}>{item.head}</Text>
        </View>
        <View style={styles.baseView}>
          <Text style={styles.containerDetailText}>{`${S.Detail.name}: `}</Text>
          <Text style={styles.containerDetailTextItem}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.containerDetailItems}>
        <View style={styles.baseView}>
          <Text style={styles.containerDetailText}>{`${S.Detail.typo}: `}</Text>
          <Text style={styles.containerDetailTextItem}>{item.type}</Text>
        </View>
      </View>
    </View>
  );
};

export default BodyDetail;
