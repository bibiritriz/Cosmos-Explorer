import React from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { ApodItem, EpicImage, NeoItem } from '../../types';
import { getEPICImageUrl } from '../../services/epic';
import { colors, spacing, typography, radius } from '../../theme';
import { formatDate, formatDateTime } from '../../utils';

type FavoriteEntry = {
  id: string;
  type: 'apod' | 'epic' | 'neo';
  data: ApodItem | EpicImage | NeoItem;
  addedAt: string;
};

function FavoriteCard({ entry, onRemove }: { entry: FavoriteEntry; onRemove: () => void }) {
  const { type, data } = entry;

  let imageUri: string | null = null;
  let title = '';
  let subtitle = '';

  if (type === 'apod') {
    const d = data as ApodItem;
    imageUri = d.url;
    title = d.title;
    subtitle = formatDate(d.date);
  } else if (type === 'epic') {
    const d = data as EpicImage;
    const dateStr = d.date.split(' ')[0];
    imageUri = getEPICImageUrl(d, dateStr);
    title = `Terra — ${formatDate(dateStr)}`;
    subtitle = d.caption;
  } else {
    const d = data as NeoItem;
    title = d.name;
    subtitle = d.is_potentially_hazardous_asteroid ? 'Potencialmente perigoso' : 'Sem risco elevado';
  }

  return (
    <View style={styles.card}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.thumb} resizeMode="cover" />
      )}
      {!imageUri && (
        <View style={[styles.thumb, styles.thumbPlaceholder]}>
          <Ionicons name="planet-outline" size={32} color={colors.border} />
        </View>
      )}
      <View style={styles.info}>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{type.toUpperCase()}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.removeBtn} onPress={onRemove} hitSlop={8}>
        <Ionicons name="heart-dislike-outline" size={20} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

export default function FavoritesScreen() {
  const { items, removeFavorite } = useFavorites();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Ionicons name="heart-outline" size={64} color={colors.border} />
        <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
        <Text style={styles.emptyBody}>
          Explore as abas APOD, Terra e NEO e toque no coração para salvar seus itens favoritos.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items as FavoriteEntry[]}
        keyExtractor={item => `${item.type}-${item.id}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FavoriteCard
            entry={item}
            onRemove={() => removeFavorite(item.id, item.type)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md, paddingTop: spacing.lg, gap: spacing.sm },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  thumb: { width: 80, height: 80 },
  thumbPlaceholder: {
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1, padding: spacing.sm, gap: spacing.xs },
  typeBadge: {
    backgroundColor: colors.accent + '33',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  typeText: { ...typography.caption, color: colors.accent, fontWeight: '700' },
  cardTitle: { ...typography.body, fontWeight: '600' },
  cardSubtitle: { ...typography.caption },
  removeBtn: { padding: spacing.md },
  empty: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  emptyTitle: { ...typography.title, color: colors.subtext },
  emptyBody: {
    ...typography.body,
    color: colors.subtext,
    textAlign: 'center',
    lineHeight: 22,
  },
});
