import { TrashIcon } from '../../components/Icons';
import { ActionButton, PageHeader } from '../../components/ui';
import { useFavorites } from '../../store/favorites/useFavorites';
import { Panel } from './styles';

export function Settings() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <>
      <PageHeader>
        <div>
          <h2>Configurações</h2>
          <p>Dados do Digidex armazenados neste navegador.</p>
        </div>
      </PageHeader>

      <Panel>
        <div>
          <strong>Favoritos salvos</strong>
          <p>{favorites.length} Digimon(s) no armazenamento local.</p>
        </div>
        <ActionButton
          type="button"
          $variant="danger"
          disabled={favorites.length === 0}
          onClick={clearFavorites}
        >
          <TrashIcon /> Limpar favoritos
        </ActionButton>
      </Panel>
    </>
  );
}
