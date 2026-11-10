import { useEffect, useState } from 'react';

interface AsyncState<T> {
  source: unknown;
  data?: T;
  error?: string;
}

/**
 * Executa `fetcher` sempre que sua identidade mudar (memoize com useCallback).
 * Enquanto a nova requisição não resolve, `isLoading` é true e `data` mantém o
 * último resultado, o que evita "piscar" a tela ao paginar.
 */
export function useAsync<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ source: null });

  useEffect(() => {
    // Descarta respostas de uma requisição que já foi substituída
    let active = true;

    fetcher()
      .then((data) => active && setState({ source: fetcher, data }))
      .catch((error: unknown) => {
        if (!active) return;
        setState((previous) => ({
          source: fetcher,
          data: previous.data,
          error: error instanceof Error ? error.message : 'Erro inesperado',
        }));
      });

    return () => {
      active = false;
    };
  }, [fetcher]);

  const isLoading = state.source !== fetcher;

  return {
    data: state.data,
    error: isLoading ? undefined : state.error,
    isLoading,
  };
}
