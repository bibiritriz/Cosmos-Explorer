import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { NeoStackParamList } from '../../navigation/AppNavigator';
import { colors, spacing, typography, radius } from '../../theme';
import { formatDate } from '../../utils';
import FavoriteButton from '../../components/FavoriteButton';

type Props = NativeStackScreenProps<NeoStackParamList, 'NeoDetail'>;

function StatBox({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, accent && { color: colors.accent }]}>{value}</Text>
    </View>
  );
}

export default function NeoDetailScreen({ route }: Props) {
  const { item } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const favorited = isFavorite(item.id, 'neo');

  function toggleFavorite() {
    if (favorited) {
      removeFavorite(item.id, 'neo');
    } else {
      addFavorite({ id: item.id, type: 'neo', data: item });
    }
  }

  const approach = item.close_approach_data[0];
  const diamMin = item.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3);
  const diamMax = item.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.headerCard, item.is_potentially_hazardous_asteroid && styles.hazardBorder]}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <FavoriteButton isFavorited={favorited} onPress={toggleFavorite} />
        </View>
        <Text style={styles.id}>ID: {item.id}</Text>

        {item.is_potentially_hazardous_asteroid && (
          <View style={styles.hazardBadge}>
            <Ionicons name="warning" size={16} color={colors.danger} />
            <Text style={styles.hazardText}>POTENCIALMENTE PERIGOSO</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diâmetro Estimado</Text>
        <View style={styles.statsRow}>
          <StatBox label="Mínimo" value={`${diamMin} km`} />
          <StatBox label="Máximo" value={`${diamMax} km`} />
        </View>
      </View>

      {approach && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próxima Aproximação</Text>
          <View style={styles.statsGrid}>
            <StatBox label="Data" value={formatDate(approach.close_approach_date)} accent />
            <StatBox
              label="Distância"
              value={`${Number(approach.miss_distance.kilometers).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} km`}
            />
            <StatBox
              label="Velocidade"
              value={`${Number(approach.relative_velocity.kilometers_per_hour).toLocaleString('pt-BR', { maximumFractionDigits: 0 })} km/h`}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingTop: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl },
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  hazardBorder: { borderColor: colors.danger },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.sm },
  name: { ...typography.title, flex: 1 },
  id: { ...typography.caption },
  hazardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.danger + '22',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  hazardText: { ...typography.caption, color: colors.danger, fontWeight: '700' },
  section: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  sectionTitle: { ...typography.subtitle, color: colors.accent },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statsGrid: { gap: spacing.sm },
  statBox: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    padding: spacing.sm,
    gap: spacing.xs,
  },
  statLabel: { ...typography.caption },
  statValue: { ...typography.subtitle },
});
