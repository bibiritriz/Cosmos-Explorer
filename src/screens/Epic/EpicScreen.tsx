import React from 'react';
import {
  View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEpic } from '../../hooks/useEpic';
import { getEPICImageUrl } from '../../services/epic';
import { EpicStackParamList } from '../../navigation/AppNavigator';
import { EpicImage } from '../../types';
import { colors, spacing, typography, radius } from '../../theme';
import { formatDate } from '../../utils';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';

type Props = {
  navigation: NativeStackNavigationProp<EpicStackParamList, 'EpicList'>;
};

const COLUMN_COUNT = 2;
const ITEM_WIDTH = (Dimensions.get('window').width - spacing.md * 3) / COLUMN_COUNT;

export default function EpicScreen({ navigation }: Props) {
  const { data, loading, error } = useEpic() as {
    data: EpicImage[] | null;
    loading: boolean;
    error: string | null;
  };

  if (loading) return <LoadingView />;
  if (error || !data) return <ErrorView message={error ?? 'Sem dados.'} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.identifier}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const dateStr = item.date.split(' ')[0];
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('EpicDetail', { item })}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: getEPICImageUrl(item, dateStr) }}
                style={styles.thumb}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text style={styles.date} numberOfLines={1}>{formatDate(dateStr)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md, paddingTop: spacing.lg },
  row: { gap: spacing.md },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  thumb: { width: '100%', height: ITEM_WIDTH, backgroundColor: colors.border },
  info: { padding: spacing.sm },
  date: { ...typography.caption },
});
