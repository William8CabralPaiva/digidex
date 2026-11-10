import { Link, useParams } from 'react-router';
import { AttributeBadge, LevelBadge } from '../../components/Badges';
import { BackButton } from '../../components/BackButton';
import { EvolutionTree } from '../../components/EvolutionTree';
import { ErrorState, Loading } from '../../components/State';
import { useDigimonDetail } from '../../hooks/useDigimonDetail';
import { getLastViewedId } from '../../utils/storage';
import { Badges, Panel, Profile } from './styles';

const getEvolutionHref = (id: number) => `/evolution/${id}`;

export function Evolution() {
  const params = useParams();
  const id = params.id ? Number(params.id) : getLastViewedId();
  const { digimon, error, isLoading } = useDigimonDetail(id);

  const nextNames = digimon?.nextEvolutions.slice(0, 4).map((item) => item.name) ?? [];
  const remaining = (digimon?.nextEvolutions.length ?? 0) - nextNames.length;

  return (
    <>
      <BackButton />

      {error && <ErrorState message={error} />}
      {isLoading && !digimon && <Loading label="Carregando evolução..." />}

      {digimon && (
        <>
          <Profile>
            <img src={digimon.image} alt={digimon.name} />
            <div>
              <h2>{digimon.name}</h2>
              <Badges>
                <LevelBadge level={digimon.level} />
                <AttributeBadge attribute={digimon.attribute} />
              </Badges>
              <Link to={`/digimon/${digimon.id}`}>Ver detalhes →</Link>
            </div>
          </Profile>

          <Panel>
            <h3>Linha de Evolução</h3>
            <EvolutionTree
              current={digimon}
              prior={digimon.priorEvolutions}
              next={digimon.nextEvolutions}
              getHref={getEvolutionHref}
            />
          </Panel>

          <Panel>
            <h3>Sobre a Evolução</h3>
            <p>
              {nextNames.length > 0
                ? `${digimon.name} pode evoluir para ${nextNames.join(', ')}${
                    remaining > 0 ? ` e mais ${remaining} formas` : ''
                  }. A evolução depende de nível, amizade e condições específicas.`
                : `${digimon.name} não possui evoluções posteriores registradas.`}
            </p>
          </Panel>
        </>
      )}
    </>
  );
}
