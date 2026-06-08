import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NeoItem } from '../types';
import { colors, spacing, typography, radius } from '../theme';
import { formatDate } from '../utils';

type Props = {
  item: NeoItem;
  onPress: () => void;
};

export default function NeoCard({ item, onPress }: Props) {
  const approach = item.close_approach_data[0];
  const diamMin = item.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2);
  const diamMax = item.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        {item.is_potentially_hazardous_asteroid && (
          <Ionicons name="warning" size={18} color={colors.danger} />
        )}
      </View>
      <Text style={styles.caption}>
        Diâmetro: {diamMin} – {diamMax} km
      </Text>
      {approach && (
        <Text style={styles.caption}>
          Aproximação: {formatDate(approach.close_approach_date)}
        </Text>
      )}
      {item.is_potentially_hazardous_asteroid && (
        <View style={styles.hazardBadge}>
          <Text style={styles.hazardText}>POTENCIALMENTE PERIGOSO</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { ...typography.subtitle, flex: 1, marginRight: spacing.sm },
  caption: { ...typography.caption },
  hazardBadge: {
    marginTop: spacing.xs,
    backgroundColor: colors.danger + '22',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  hazardText: { ...typography.caption, color: colors.danger, fontWeight: '700' },
});
