import { Link } from 'react-router';
import { EmptyState } from '../../components/State';
import { Actions } from './styles';

export function NotFound() {
  return (
    <>
      <EmptyState message="Página não encontrada." />
      <Actions>
        <Link to="/">Voltar ao Explorar</Link>
      </Actions>
    </>
  );
}
