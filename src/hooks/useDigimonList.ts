import { useCallback } from 'react';
import { fetchDigimonPage } from '../services/digimonApi';
import type { DigimonQuery } from '../types/digimon';
import { useAsync } from './useAsync';

export function useDigimonList({ page, pageSize, name, level, attribute, sort }: DigimonQuery) {
  const fetcher = useCallback(
    (signal: AbortSignal) =>
      fetchDigimonPage({ page, pageSize, name, level, attribute, sort }, signal),
    [page, pageSize, name, level, attribute, sort],
  );

  return useAsync(fetcher);
}
