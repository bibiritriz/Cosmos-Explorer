import { createContext, useContext, useReducer } from 'react';

const FavoritesContext = createContext(null);

const initialState = { items: [] };

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const { id, type } = action.payload;
      const alreadyExists = state.items.some(i => i.id === id && i.type === type);
      if (alreadyExists) return state;
      return {
        items: [
          ...state.items,
          { ...action.payload, addedAt: new Date().toISOString() },
        ],
      };
    }
    case 'REMOVE_FAVORITE': {
      const { id, type } = action.payload;
      return {
        items: state.items.filter(i => !(i.id === id && i.type === type)),
      };
    }
    case 'CLEAR_FAVORITES':
      return initialState;
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addFavorite = ({ id, type, data }) =>
    dispatch({ type: 'ADD_FAVORITE', payload: { id, type, data } });

  const removeFavorite = (id, type) =>
    dispatch({ type: 'REMOVE_FAVORITE', payload: { id, type } });

  const clearFavorites = () =>
    dispatch({ type: 'CLEAR_FAVORITES' });

  const isFavorite = (id, type) =>
    state.items.some(i => i.id === id && i.type === type);

  return (
    <FavoritesContext.Provider
      value={{ items: state.items, addFavorite, removeFavorite, clearFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
