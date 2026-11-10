import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { DigimonSummary } from '../../types/digimon';
import { readStorage, writeStorage } from '../../utils/storage';
import { FavoritesContext, type FavoritesContextValue } from './FavoritesContext';
import { favoritesReducer } from './favoritesReducer';

const STORAGE_KEY = 'digidex:favorites';

const loadFavorites = (): DigimonSummary[] => {
  const stored = readStorage<unknown>(STORAGE_KEY, []);
  return Array.isArray(stored) ? (stored as DigimonSummary[]) : [];
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, loadFavorites);

  useEffect(() => {
    writeStorage(STORAGE_KEY, favorites);
  }, [favorites]);

  const isFavorite = useCallback(
    (id: number) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (digimon: DigimonSummary) => {
      dispatch(
        isFavorite(digimon.id)
          ? { type: 'REMOVE', payload: { id: digimon.id } }
          : { type: 'ADD', payload: digimon },
      );
    },
    [isFavorite],
  );

  const clearFavorites = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ favorites, dispatch, isFavorite, toggleFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, clearFavorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
