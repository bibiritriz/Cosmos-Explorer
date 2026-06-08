import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';

type Props = {
  isFavorited: boolean;
  onPress: () => void;
};

export default function FavoriteButton({ isFavorited, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Ionicons
        name={isFavorited ? 'heart' : 'heart-outline'}
        size={24}
        color={isFavorited ? colors.danger : colors.text}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.card,
    padding: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
