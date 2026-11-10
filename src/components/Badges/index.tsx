import { useTheme } from 'styled-components';
import { getLevelLabel } from '../../utils/digimon';
import { Dot, LevelPill, Pill } from './styles';

export function LevelBadge({ level }: { level: string }) {
  return <LevelPill>{getLevelLabel(level)}</LevelPill>;
}

export function AttributeBadge({ attribute }: { attribute: string }) {
  const theme = useTheme();
  const color = theme.attributes[attribute] ?? theme.attributes.Unknown;

  return (
    <Pill $color={color}>
      <Dot $color={color} />
      {attribute}
    </Pill>
  );
}

export function TypeBadge({ label }: { label: string }) {
  const { colors } = useTheme();

  return (
    <Pill $color={colors.cyan}>
      <Dot $color={colors.cyan} />
      {label}
    </Pill>
  );
}
