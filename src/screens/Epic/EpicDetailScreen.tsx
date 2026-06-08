import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFavorites } from '../../context/FavoritesContext';
import { getEPICImageUrl } from '../../services/epic';
import { EpicStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography, radius } from '../../theme';
import { formatDateTime } from '../../utils';
import FavoriteButton from '../../components/FavoriteButton';

type Props = NativeStackScreenProps<EpicStackParamList, 'EpicDetail'>;

export default function EpicDetailScreen({ route }: Props) {
  const { item } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const dateStr = item.date.split(' ')[0];
  const imageUrl = getEPICImageUrl(item, dateStr);
  const favorited = isFavorite(item.identifier, 'epic');

  function toggleFavorite() {
    if (favorited) {
      removeFavorite(item.identifier, 'epic');
    } else {
      addFavorite({ id: item.identifier, type: 'epic', data: item });
    }
  }

  const coords = item.coords?.centroid_coordinates;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.infoBlock}>
            <Text style={styles.date}>{formatDateTime(item.date)}</Text>
            <Text style={styles.id}>ID: {item.identifier}</Text>
          </View>
          <FavoriteButton isFavorited={favorited} onPress={toggleFavorite} />
        </View>

        <View style={styles.divider} />
        <Text style={styles.caption}>{item.caption}</Text>

        {coords && (
          <View style={styles.coordsRow}>
            <View style={styles.coordBox}>
              <Text style={styles.coordLabel}>Latitude</Text>
              <Text style={styles.coordValue}>{coords.lat.toFixed(2)}°</Text>
            </View>
            <View style={styles.coordBox}>
              <Text style={styles.coordLabel}>Longitude</Text>
              <Text style={styles.coordValue}>{coords.lon.toFixed(2)}°</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingTop: spacing.lg, paddingBottom: spacing.xl },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: colors.card,
  },
  card: {
    margin: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  infoBlock: { gap: spacing.xs },
  date: { ...typography.caption, color: colors.accent },
  id: { ...typography.caption },
  divider: { height: 1, backgroundColor: colors.border },
  caption: { ...typography.body, lineHeight: 22, color: colors.subtext },
  coordsRow: { flexDirection: 'row', gap: spacing.md },
  coordBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    padding: spacing.sm,
    alignItems: 'center',
    gap: spacing.xs,
  },
  coordLabel: { ...typography.caption },
  coordValue: { ...typography.subtitle, color: colors.accent },
});
