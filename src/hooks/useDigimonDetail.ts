import { useCallback, useEffect } from 'react';
import { fetchDigimon } from '../services/digimonApi';
import { setLastViewedId } from '../utils/storage';
import { useAsync } from './useAsync';

export function useDigimonDetail(id: number) {
  const fetcher = useCallback(() => fetchDigimon(id), [id]);
  const { data, error, isLoading } = useAsync(fetcher);

  useEffect(() => {
    setLastViewedId(id);
  }, [id]);

  // `data` pode ser de um Digimon anterior enquanto o novo carrega
  return { digimon: data?.id === id ? data : undefined, error, isLoading };
}
