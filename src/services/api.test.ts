import { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { api } from './api'

const originalAdapter = api.defaults.adapter

afterEach(() => {
  api.defaults.adapter = originalAdapter
})

describe('api', () => {
  it('usa a baseURL da Digi-API', () => {
    expect(api.defaults.baseURL).toBe('https://digi-api.com/api/v1')
  })

  it('devolve a resposta em caso de sucesso', async () => {
    api.defaults.adapter = async (config) => ({
      data: { ok: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    })

    const { data } = await api.get('/digimon')
    expect(data).toEqual({ ok: true })
  })

  it('converte erro HTTP em mensagem com o status', async () => {
    api.defaults.adapter = async (config) => {
      throw new AxiosError('fail', 'ERR_BAD_RESPONSE', config, null, {
        status: 500,
        statusText: 'Server Error',
        headers: {},
        config: config as InternalAxiosRequestConfig,
        data: null,
      })
    }

    await expect(api.get('/x')).rejects.toThrow('Falha ao consultar a API (500)')
  })

  it('converte erro de rede em mensagem de conexão', async () => {
    api.defaults.adapter = async (config) => {
      throw new AxiosError('Network Error', 'ERR_NETWORK', config)
    }

    await expect(api.get('/x')).rejects.toThrow('Não foi possível conectar à API')
  })

  it('usa mensagem genérica para erros que não são do axios', async () => {
    api.defaults.adapter = async () => {
      throw new Error('boom')
    }

    await expect(api.get('/x')).rejects.toThrow('Erro inesperado')
  })
})
