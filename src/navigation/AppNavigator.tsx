import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme';
import { ApodItem, EpicImage, NeoItem } from '../types';

import ApodScreen from '../screens/Apod/ApodScreen';
import ApodDetailScreen from '../screens/Apod/ApodDetailScreen';
import EpicScreen from '../screens/Epic/EpicScreen';
import EpicDetailScreen from '../screens/Epic/EpicDetailScreen';
import NeoScreen from '../screens/Neo/NeoScreen';
import NeoDetailScreen from '../screens/Neo/NeoDetailScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';

export type ApodStackParamList = {
  ApodList: undefined;
  ApodDetail: { item: ApodItem };
};

export type EpicStackParamList = {
  EpicList: undefined;
  EpicDetail: { item: EpicImage };
};

export type NeoStackParamList = {
  NeoList: undefined;
  NeoDetail: { item: NeoItem };
};

const ApodStack = createNativeStackNavigator<ApodStackParamList>();
const EpicStack = createNativeStackNavigator<EpicStackParamList>();
const NeoStack = createNativeStackNavigator<NeoStackParamList>();
const Tab = createBottomTabNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: colors.card },
  headerTintColor: colors.accent,
  headerTitleStyle: { color: colors.text },
};

function ApodStackNavigator() {
  return (
    <ApodStack.Navigator screenOptions={stackScreenOptions}>
      <ApodStack.Screen name="ApodList" component={ApodScreen} options={{ title: 'Foto do Dia' }} />
      <ApodStack.Screen name="ApodDetail" component={ApodDetailScreen} options={{ title: 'Detalhes' }} />
    </ApodStack.Navigator>
  );
}

function EpicStackNavigator() {
  return (
    <EpicStack.Navigator screenOptions={stackScreenOptions}>
      <EpicStack.Screen name="EpicList" component={EpicScreen} options={{ title: 'Terra (EPIC)' }} />
      <EpicStack.Screen name="EpicDetail" component={EpicDetailScreen} options={{ title: 'Detalhes' }} />
    </EpicStack.Navigator>
  );
}

function NeoStackNavigator() {
  return (
    <NeoStack.Navigator screenOptions={stackScreenOptions}>
      <NeoStack.Screen name="NeoList" component={NeoScreen} options={{ title: 'Asteroides' }} />
      <NeoStack.Screen name="NeoDetail" component={NeoDetailScreen} options={{ title: 'Detalhes' }} />
    </NeoStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.subtext,
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            APOD: focused ? 'planet' : 'planet-outline',
            Terra: focused ? 'earth' : 'earth-outline',
            NEO: focused ? 'warning' : 'warning-outline',
            Favoritos: focused ? 'heart' : 'heart-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="APOD" component={ApodStackNavigator} />
      <Tab.Screen name="Terra" component={EpicStackNavigator} />
      <Tab.Screen name="NEO" component={NeoStackNavigator} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
}
