import { memo } from 'react';
import type { DigimonSummary } from '../../types/digimon';
import { AttributeBadge, LevelBadge } from '../Badges';
import { FavoriteButton } from '../FavoriteButton';
import { Card, CardLink, FavoriteSlot, Info, LevelSlot, Thumb } from './styles';

interface DigimonCardProps {
  digimon: DigimonSummary;
}

export const DigimonCard = memo(function DigimonCard({ digimon }: DigimonCardProps) {
  return (
    <Card>
      <FavoriteSlot>
        <FavoriteButton digimon={digimon} size="sm" />
      </FavoriteSlot>
      <CardLink to={`/digimon/${digimon.id}`} aria-label={`Ver detalhes de ${digimon.name}`}>
        <Thumb>
          <img src={digimon.image} alt={digimon.name} loading="lazy" />
          <LevelSlot>
            <LevelBadge level={digimon.level} />
          </LevelSlot>
        </Thumb>
        <Info>
          <strong>{digimon.name}</strong>
          <AttributeBadge attribute={digimon.attribute} />
        </Info>
      </CardLink>
    </Card>
  );
});
