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
export function useAsync<T>(fetcher: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ source: null });

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((data) => setState({ source: fetcher, data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState((previous) => ({
          source: fetcher,
          data: previous.data,
          error: error instanceof Error ? error.message : 'Erro inesperado',
        }));
      });

    return () => controller.abort();
  }, [fetcher]);

  const isLoading = state.source !== fetcher;

  return {
    data: state.data,
    error: isLoading ? undefined : state.error,
    isLoading,
  };
}
