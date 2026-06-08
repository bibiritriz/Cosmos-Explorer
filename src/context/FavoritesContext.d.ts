import React from 'react';

export type FavoritesContextValue = {
  items: { id: string; type: string; data: unknown; addedAt: string }[];
  addFavorite: (args: { id: string; type: string; data: unknown }) => void;
  removeFavorite: (id: string, type: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string, type: string) => boolean;
};

export function FavoritesProvider(props: { children: React.ReactNode }): React.JSX.Element;
export function useFavorites(): FavoritesContextValue;
