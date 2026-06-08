import React from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFavorites } from '../../context/FavoritesContext';
import { ApodStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography, radius } from '../../theme';
import { formatDate } from '../../utils';
import FavoriteButton from '../../components/FavoriteButton';

type Props = NativeStackScreenProps<ApodStackParamList, 'ApodDetail'>;

export default function ApodDetailScreen({ route }: Props) {
  const { item } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const favorited = isFavorite(item.date, 'apod');

  function toggleFavorite() {
    if (favorited) {
      removeFavorite(item.date, 'apod');
    } else {
      addFavorite({ id: item.date, type: 'apod', data: item });
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: item.url }} style={styles.image} resizeMode="cover" />

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.titleBlock}>
            <Text style={styles.date}>{formatDate(item.date)}</Text>
            <Text style={styles.title}>{item.title}</Text>
            {item.copyright && <Text style={styles.copyright}>© {item.copyright}</Text>}
          </View>
          <FavoriteButton isFavorited={favorited} onPress={toggleFavorite} />
        </View>

        <View style={styles.divider} />
        <Text style={styles.explanation}>{item.explanation}</Text>

        {item.hdurl && (
          <TouchableOpacity
            style={styles.hdButton}
            onPress={() => Linking.openURL(item.hdurl!)}
          >
            <Text style={styles.hdButtonText}>Ver em HD</Text>
          </TouchableOpacity>
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
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  titleBlock: { flex: 1, gap: spacing.xs },
  date: { ...typography.caption, color: colors.accent },
  title: { ...typography.title },
  copyright: { ...typography.caption },
  divider: { height: 1, backgroundColor: colors.border },
  explanation: { ...typography.body, lineHeight: 22, color: colors.subtext },
  hdButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  hdButtonText: { ...typography.subtitle, color: colors.background },
});
