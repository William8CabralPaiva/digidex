import type { EvolutionLink } from '../../types/digimon';
import { Arrow, Column, Empty, Node, Wrapper } from './styles';

interface EvolutionTreeProps {
  current: Pick<EvolutionLink, 'id' | 'name' | 'image'>;
  prior: EvolutionLink[];
  next: EvolutionLink[];
  getHref: (id: number) => string;
}

function Nodes({ items, getHref }: { items: EvolutionLink[]; getHref: (id: number) => string }) {
  return (
    <Column>
      {items.map((item) => (
        <Node key={item.id} to={getHref(item.id)} title={item.condition || item.name}>
          <img src={item.image} alt="" loading="lazy" />
          {item.name}
        </Node>
      ))}
    </Column>
  );
}

export function EvolutionTree({ current, prior, next, getHref }: EvolutionTreeProps) {
  if (prior.length === 0 && next.length === 0) {
    return <Empty>Este Digimon não possui linha de evolução registrada.</Empty>;
  }

  return (
    <Wrapper>
      {prior.length > 0 && (
        <>
          <Nodes items={prior} getHref={getHref} />
          <Arrow aria-hidden="true">›</Arrow>
        </>
      )}

      <Column>
        <Node to={getHref(current.id)} $current>
          <img src={current.image} alt="" />
          {current.name}
        </Node>
      </Column>

      {next.length > 0 && (
        <>
          <Arrow aria-hidden="true">›</Arrow>
          <Nodes items={next} getHref={getHref} />
        </>
      )}
    </Wrapper>
  );
}
