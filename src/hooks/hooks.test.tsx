import { act, renderHook, waitFor } from '@testing-library/react'
import { agumonDetail } from '../test/utils'
import { useAsync } from './useAsync'
import { useDebounce } from './useDebounce'
import { useDigimonDetail } from './useDigimonDetail'
import { useDigimonList } from './useDigimonList'

const fetchDigimon = vi.fn()
const fetchDigimonPage = vi.fn()
vi.mock('../services/digimonApi', () => ({
  fetchDigimon: (...args: unknown[]) => fetchDigimon(...args),
  fetchDigimonPage: (...args: unknown[]) => fetchDigimonPage(...args),
}))

describe('useAsync', () => {
  it('carrega e entrega os dados', async () => {
    const fetcher = () => Promise.resolve('ok')
    const { result } = renderHook(() => useAsync(fetcher))

    expect(result.current.isLoading).toBe(true)
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.data).toBe('ok')
    expect(result.current.error).toBeUndefined()
  })

  it('expõe a mensagem de erro e mantém dados anteriores', async () => {
    const ok = () => Promise.resolve('antes')
    const fail = () => Promise.reject(new Error('falhou'))
    const { result, rerender } = renderHook(({ f }) => useAsync(f), { initialProps: { f: ok } })
    await waitFor(() => expect(result.current.data).toBe('antes'))

    rerender({ f: fail })
    await waitFor(() => expect(result.current.error).toBe('falhou'))
    expect(result.current.data).toBe('antes')
  })

  it('usa mensagem padrão para erros que não são Error', async () => {
    const fetcher = () => Promise.reject('texto')
    const { result } = renderHook(() => useAsync(fetcher))

    await waitFor(() => expect(result.current.error).toBe('Erro inesperado'))
  })

  it('descarta respostas de requisições substituídas', async () => {
    let resolveFirst!: (value: string) => void
    const first = () => new Promise<string>((resolve) => (resolveFirst = resolve))
    const second = () => Promise.resolve('segundo')
    const { result, rerender } = renderHook(({ f }) => useAsync(f), { initialProps: { f: first } })

    rerender({ f: second })
    await waitFor(() => expect(result.current.data).toBe('segundo'))
    await act(async () => resolveFirst('primeiro'))

    expect(result.current.data).toBe('segundo')
  })

  it('descarta erros de requisições substituídas', async () => {
    let rejectFirst!: (reason: Error) => void
    const first = () => new Promise<string>((_, reject) => (rejectFirst = reject))
    const second = () => Promise.resolve('segundo')
    const { result, rerender } = renderHook(({ f }) => useAsync(f), { initialProps: { f: first } })

    rerender({ f: second })
    await waitFor(() => expect(result.current.data).toBe('segundo'))
    await act(async () => rejectFirst(new Error('velho')))

    expect(result.current.error).toBeUndefined()
  })
})

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('só atualiza o valor após o atraso', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), {
      initialProps: { v: 'a' },
    })

    rerender({ v: 'b' })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(200)
    })
    expect(result.current).toBe('b')
  })

  it('usa 400ms como atraso padrão', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v), { initialProps: { v: 1 } })

    rerender({ v: 2 })
    act(() => {
      vi.advanceTimersByTime(399)
    })
    expect(result.current).toBe(1)
    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe(2)
  })
})

describe('useDigimonDetail', () => {
  beforeEach(() => {
    fetchDigimon.mockReset()
  })

  it('carrega o Digimon e grava o último visto', async () => {
    fetchDigimon.mockResolvedValue(agumonDetail)
    const { result } = renderHook(() => useDigimonDetail(1))

    await waitFor(() => expect(result.current.digimon).toEqual(agumonDetail))
    expect(fetchDigimon).toHaveBeenCalledWith(1)
    expect(localStorage.getItem('digidex:last-viewed')).toBe('1')
  })

  it('não expõe dados de outro id enquanto carrega', async () => {
    fetchDigimon.mockImplementation((id: number) =>
      id === 1 ? Promise.resolve(agumonDetail) : new Promise(() => {}),
    )
    const { result, rerender } = renderHook(({ id }) => useDigimonDetail(id), {
      initialProps: { id: 1 },
    })
    await waitFor(() => expect(result.current.digimon).toBeDefined())

    rerender({ id: 2 })
    expect(result.current.digimon).toBeUndefined()
    expect(result.current.isLoading).toBe(true)
  })
})

describe('useDigimonList', () => {
  it('repassa a consulta ao serviço', async () => {
    const page = { items: [], totalElements: 0, totalPages: 0 }
    fetchDigimonPage.mockResolvedValue(page)
    const query = { page: 2, pageSize: 9, name: 'a', level: 'Child', attribute: 'Data', sort: 'desc' as const }

    const { result } = renderHook(() => useDigimonList(query))

    await waitFor(() => expect(result.current.data).toEqual(page))
    expect(fetchDigimonPage).toHaveBeenCalledWith(query)
  })
})

