import { useState } from 'react';
import { useParams } from 'react-router';
import { AttributeBadge, LevelBadge, TypeBadge } from '../../components/Badges';
import { BackButton } from '../../components/BackButton';
import { EvolutionTree } from '../../components/EvolutionTree';
import { FavoriteButton } from '../../components/FavoriteButton';
import { EmptyState, ErrorState, Loading } from '../../components/State';
import { useDigimonDetail } from '../../hooks/useDigimonDetail';
import { toSummary } from '../../services/digimonApi';
import type { DigimonDetail as DigimonDetailData } from '../../types/digimon';
import { getLevelLabel } from '../../utils/digimon';
import {
  BadgeRow,
  Hero,
  InfoTable,
  Panel,
  Portrait,
  SectionTitle,
  Skills,
  Summary,
  Tab,
  Tabs,
  TopBar,
} from './styles';

type TabKey = 'overview' | 'abilities' | 'evolution';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Visão geral' },
  { key: 'abilities', label: 'Habilidades' },
  { key: 'evolution', label: 'Evolução' },
];

const getDetailHref = (id: number) => `/digimon/${id}`;

function TabContent({ tab, digimon }: { tab: TabKey; digimon: DigimonDetailData }) {
  if (tab === 'abilities') {
    return digimon.skills.length === 0 ? (
      <EmptyState message="Nenhuma habilidade registrada." />
    ) : (
      <Skills>
        {digimon.skills.map((skill) => (
          <li key={skill.name}>
            <strong>{skill.name}</strong>
            {skill.translation && <small>({skill.translation})</small>}
            {skill.description && <p>{skill.description}</p>}
          </li>
        ))}
      </Skills>
    );
  }

  const evolution = (
    <EvolutionTree
      current={digimon}
      prior={digimon.priorEvolutions}
      next={digimon.nextEvolutions}
      getHref={getDetailHref}
    />
  );

  if (tab === 'evolution') return evolution;

  return (
    <Panel>
      <SectionTitle>Informações</SectionTitle>
      <InfoTable>
        <dt>Nível</dt>
        <dd>{digimon.level}</dd>
        <dt>Atributo</dt>
        <dd>{digimon.attribute}</dd>
        <dt>Tipo</dt>
        <dd>{digimon.types.join(', ') || '—'}</dd>
        <dt>Lançamento</dt>
        <dd>{digimon.releaseDate || '—'}</dd>
        <dt>Campos</dt>
        <dd>{digimon.fields.join(', ') || '—'}</dd>
      </InfoTable>
      <SectionTitle>Linha de evolução</SectionTitle>
      {evolution}
    </Panel>
  );
}

export function DigimonDetail() {
  const id = Number(useParams().id);
  const { digimon, error, isLoading } = useDigimonDetail(id);
  const [tab, setTab] = useState<TabKey>('overview');

  return (
    <>
      <TopBar>
        <BackButton />
        {digimon && <FavoriteButton digimon={toSummary(digimon)} />}
      </TopBar>

      {error && <ErrorState message={error} />}
      {isLoading && !digimon && <Loading label="Carregando Digimon..." />}

      {digimon && (
        <>
          <Hero>
            <Portrait>
              <img src={digimon.image} alt={digimon.name} />
            </Portrait>
            <Summary>
              <h2>{digimon.name}</h2>
              <BadgeRow>
                <LevelBadge level={digimon.level} />
                <AttributeBadge attribute={digimon.attribute} />
                {digimon.types.map((type) => (
                  <TypeBadge key={type} label={type} />
                ))}
              </BadgeRow>
              <p>{digimon.description || `${getLevelLabel(digimon.level)} sem descrição.`}</p>
            </Summary>
          </Hero>

          <Tabs role="tablist">
            {TABS.map(({ key, label }) => (
              <Tab
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                $active={tab === key}
                onClick={() => setTab(key)}
              >
                {label}
              </Tab>
            ))}
          </Tabs>

          <TabContent tab={tab} digimon={digimon} />
        </>
      )}
    </>
  );
}
