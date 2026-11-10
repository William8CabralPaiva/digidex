import type { ComponentType } from 'react';
import { useMatch } from 'react-router';
import { getLastViewedId } from '../../utils/storage';
import { EvolutionIcon, GridIcon, SettingsIcon, StarIcon } from '../Icons';
import { Item, Nav } from './styles';

interface NavEntry {
  label: string;
  to: string;
  pattern: string;
  end?: boolean;
  Icon: ComponentType;
}

function SidebarItem({ label, to, pattern, end, Icon }: NavEntry) {
  const active = useMatch({ path: pattern, end: end ?? true }) !== null;

  return (
    <Item to={to} $active={active} aria-current={active ? 'page' : undefined}>
      <Icon />
      {label}
    </Item>
  );
}

export function Sidebar() {
  // Evolução precisa de um Digimon: abre o último visualizado (ou o padrão)
  const entries: NavEntry[] = [
    { label: 'Explorar', to: '/', pattern: '/', Icon: GridIcon },
    { label: 'Favoritos', to: '/favorites', pattern: '/favorites', Icon: StarIcon },
    {
      label: 'Evolução',
      to: `/evolution/${getLastViewedId()}`,
      pattern: '/evolution/*',
      end: false,
      Icon: EvolutionIcon,
    },
    { label: 'Configurações', to: '/settings', pattern: '/settings', Icon: SettingsIcon },
  ];

  return (
    <Nav aria-label="Navegação principal">
      {entries.map((entry) => (
        <SidebarItem key={entry.pattern} {...entry} />
      ))}
    </Nav>
  );
}
