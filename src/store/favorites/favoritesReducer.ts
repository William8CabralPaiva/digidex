import type { DigimonSummary } from '../../types/digimon';

export type FavoritesAction =
  | { type: 'ADD'; payload: DigimonSummary }
  | { type: 'REMOVE'; payload: { id: number } }
  | { type: 'CLEAR' };

export function favoritesReducer(
  state: DigimonSummary[],
  action: FavoritesAction,
): DigimonSummary[] {
  switch (action.type) {
    case 'ADD':
      return state.some((item) => item.id === action.payload.id)
        ? state
        : [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload.id);
    case 'CLEAR':
      return [];
  }
}
