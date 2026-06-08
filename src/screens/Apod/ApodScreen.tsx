import React from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApod } from '../../hooks/useApod';
import { ApodStackParamList } from '../../navigation/AppNavigator';
import { ApodItem } from '../../types';
import { colors, spacing, typography, radius } from '../../theme';
import { formatDate } from '../../utils';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';

type Props = {
  navigation: NativeStackNavigationProp<ApodStackParamList, 'ApodList'>;
};

export default function ApodScreen({ navigation }: Props) {
  const { data, loading, error, retry } = useApod() as {
    data: ApodItem | null;
    loading: boolean;
    error: string | null;
    retry?: () => void;
  };

  if (loading) return <LoadingView />;
  if (error || !data) return <ErrorView message={error ?? 'Sem dados.'} onRetry={retry} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ApodDetail', { item: data })}
      >
        <Image source={{ uri: data.url }} style={styles.image} resizeMode="cover" />
        <View style={styles.overlay}>
          <Text style={styles.date}>{formatDate(data.date)}</Text>
          <Text style={styles.title}>{data.title}</Text>
          {data.copyright && <Text style={styles.copyright}>© {data.copyright}</Text>}
          <Text style={styles.hint}>Toque para ver detalhes →</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, paddingTop: spacing.lg },
  image: {
    width: '100%',
    height: 280,
    borderRadius: radius.md,
    backgroundColor: colors.card,
  },
  overlay: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.border,
  },
  date: { ...typography.caption, color: colors.accent },
  title: { ...typography.title },
  copyright: { ...typography.caption },
  hint: { ...typography.caption, color: colors.accent, textAlign: 'right', marginTop: spacing.xs },
});
