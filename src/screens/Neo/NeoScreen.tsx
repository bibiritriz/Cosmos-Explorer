import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNeo } from '../../hooks/useNeo';
import { NeoStackParamList } from '../../navigation/AppNavigator';
import { NeoItem } from '../../types';
import { colors, spacing } from '../../theme';
import NeoCard from '../../components/NeoCard';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';

type Props = {
  navigation: NativeStackNavigationProp<NeoStackParamList, 'NeoList'>;
};

export default function NeoScreen({ navigation }: Props) {
  const { data, loading, error } = useNeo() as {
    data: { near_earth_objects: Record<string, NeoItem[]> } | null;
    loading: boolean;
    error: string | null;
  };

  const neos = useMemo<NeoItem[]>(() => {
    if (!data?.near_earth_objects) return [];
    return (Object.values(data.near_earth_objects) as NeoItem[][]).flat();
  }, [data]);

  if (loading) return <LoadingView />;
  if (error || !data) return <ErrorView message={error ?? 'Sem dados.'} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={neos}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NeoCard item={item} onPress={() => navigation.navigate('NeoDetail', { item })} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { paddingVertical: spacing.md, paddingTop: spacing.lg },
});
