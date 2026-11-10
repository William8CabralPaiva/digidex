import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { DigimonCard } from '../../components/DigimonCard';
import { Pagination } from '../../components/Pagination';
import { SearchFilters, type SortOrder } from '../../components/SearchFilters';
import { EmptyState, ErrorState, Loading } from '../../components/State';
import { DigimonGrid, Footer } from '../../components/ui';
import { useDebounce } from '../../hooks/useDebounce';
import { useDigimonList } from '../../hooks/useDigimonList';

const PAGE_SIZE = 9;

export function Explorer() {
  const [params, setParams] = useSearchParams();

  const query = params.get('q') ?? '';
  const level = params.get('level') ?? '';
  const attribute = params.get('attribute') ?? '';
  const sort: SortOrder = params.get('sort') === 'desc' ? 'desc' : 'asc';
  const page = Math.max(1, Number(params.get('page')) || 1);

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search.trim());

  // Filtros e página vivem na URL para que voltar/compartilhar preserve o estado
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          Object.entries(updates).forEach(([key, value]) => {
            if (value) next.set(key, value);
            else next.delete(key);
          });
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );

  useEffect(() => {
    if (debouncedSearch !== query) {
      updateParams({ q: debouncedSearch, page: null });
    }
  }, [debouncedSearch, query, updateParams]);

  const { data, error, isLoading } = useDigimonList({
    page,
    pageSize: PAGE_SIZE,
    name: query || undefined,
    level: level || undefined,
    attribute: attribute || undefined,
    sort,
  });

  const items = data?.items;

  const handlePageChange = useCallback(
    (next: number) => updateParams({ page: next > 1 ? String(next) : null }),
    [updateParams],
  );

  const firstItem = (page - 1) * PAGE_SIZE + 1;
  const lastItem = firstItem + (items?.length ?? 0) - 1;

  return (
    <>
      <SearchFilters
        search={search}
        level={level}
        attribute={attribute}
        sort={sort}
        onSearchChange={setSearch}
        onLevelChange={(value) => updateParams({ level: value, page: null })}
        onAttributeChange={(value) => updateParams({ attribute: value, page: null })}
        onSortChange={(value) => updateParams({ sort: value === 'desc' ? value : null })}
      />

      {error && !items && <ErrorState message={error} />}
      {!items && !error && <Loading label="Carregando Digimons..." />}

      {items && items.length === 0 && !isLoading && (
        <EmptyState message="Nenhum Digimon encontrado para os filtros atuais." />
      )}

      {items && items.length > 0 && (
        <DigimonGrid $dimmed={isLoading}>
          {items.map((digimon) => (
            <DigimonCard key={digimon.id} digimon={digimon} />
          ))}
        </DigimonGrid>
      )}

      {data && data.totalPages > 0 && (
        <Footer>
          <Pagination page={page} totalPages={data.totalPages} onChange={handlePageChange} />
          <span>
            Mostrando {firstItem}–{Math.max(lastItem, firstItem)} de {data.totalElements} Digimons
          </span>
        </Footer>
      )}
    </>
  );
}
