import type { DigimonSummary } from '../../types/digimon';
import { useFavorites } from '../../store/favorites/useFavorites';
import { StarIcon } from '../Icons';
import { Button } from './styles';

interface FavoriteButtonProps {
  digimon: DigimonSummary;
  size?: 'sm' | 'md';
}

export function FavoriteButton({ digimon, size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(digimon.id);

  return (
    <Button
      type="button"
      $active={active}
      $size={size}
      aria-pressed={active}
      aria-label={active ? `Remover ${digimon.name} dos favoritos` : `Favoritar ${digimon.name}`}
      onClick={() => toggleFavorite(digimon)}
    >
      <StarIcon filled={active} />
    </Button>
  );
}
