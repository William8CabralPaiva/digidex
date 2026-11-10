import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://digi-api.com/api/v1',
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const message = axios.isAxiosError(error)
      ? error.response
        ? `Falha ao consultar a API (${error.response.status})`
        : 'Não foi possível conectar à API. Verifique sua conexão.'
      : 'Erro inesperado';

    return Promise.reject(new Error(message));
  },
);
