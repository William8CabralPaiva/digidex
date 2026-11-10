import { createContext, type Dispatch } from 'react';
import type { DigimonSummary } from '../../types/digimon';
import type { FavoritesAction } from './favoritesReducer';

export interface FavoritesContextValue {
  favorites: DigimonSummary[];
  dispatch: Dispatch<FavoritesAction>;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (digimon: DigimonSummary) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);
