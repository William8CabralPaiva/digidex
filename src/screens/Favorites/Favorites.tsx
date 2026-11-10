import { useState } from 'react';
import { DigimonCard } from '../../components/DigimonCard';
import { StarIcon, TrashIcon } from '../../components/Icons';
import { Pagination } from '../../components/Pagination';
import { EmptyState } from '../../components/State';
import { ActionButton, DigimonGrid, PageHeader } from '../../components/ui';
import { useFavorites } from '../../store/favorites/useFavorites';

const PAGE_SIZE = 6;

export function Favorites() {
  const { favorites, clearFavorites } = useFavorites();
  const [requestedPage, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE));
  // Ao remover o último item de uma página, volta para a última válida
  const page = Math.min(requestedPage, totalPages);
  const visible = favorites.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <PageHeader>
        <div>
          <h2>
            <StarIcon filled /> Meus Favoritos
          </h2>
          <p>Seus Digimons favoritos em um só lugar.</p>
        </div>
        <ActionButton
          type="button"
          $variant="danger"
          disabled={favorites.length === 0}
          onClick={clearFavorites}
        >
          <TrashIcon /> Limpar tudo
        </ActionButton>
      </PageHeader>

      {favorites.length === 0 ? (
        <EmptyState message="Você ainda não favoritou nenhum Digimon. Explore e toque na estrela!" />
      ) : (
        <>
          <DigimonGrid>
            {visible.map((digimon) => (
              <DigimonCard key={digimon.id} digimon={digimon} />
            ))}
          </DigimonGrid>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </>
  );
}
