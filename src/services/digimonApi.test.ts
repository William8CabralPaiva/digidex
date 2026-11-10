import type * as DigimonApi from './digimonApi'

const get = vi.fn()
vi.mock('./api', () => ({ api: { get: (...args: unknown[]) => get(...args) } }))

let service: typeof DigimonApi

const raw = (id: number, overrides: Record<string, unknown> = {}) => ({
  id,
  name: `Digimon${id}`,
  images: [{ href: `img${id}.png` }],
  levels: [{ level: 'Child' }],
  types: [{ type: 'Reptile' }],
  attributes: [{ attribute: 'Data' }],
  fields: [{ field: 'Nature' }],
  releaseDate: '1999',
  descriptions: [
    { language: 'jp', description: 'jp' },
    { language: 'en_us', description: 'english' },
  ],
  skills: [{ skill: 'Blast', translation: 'Tiro', description: 'desc' }],
  priorEvolutions: [{ id: 99, digimon: 'Prev', condition: 'c', image: 'p.png' }],
  nextEvolutions: [],
  ...overrides,
})

const indexOf = (names: string[]) => ({
  data: { content: names.map((name, i) => ({ id: i + 1, name, extra: 'x' })) },
})

beforeEach(async () => {
  vi.resetModules()
  get.mockReset()
  service = await import('./digimonApi')
})

describe('fetchDigimon', () => {
  it('converte a resposta crua em DigimonDetail', async () => {
    get.mockResolvedValue({ data: raw(5) })

    const detail = await service.fetchDigimon(5)

    expect(get).toHaveBeenCalledWith('/digimon/5')
    expect(detail).toMatchObject({
      id: 5,
      name: 'Digimon5',
      image: 'img5.png',
      level: 'Child',
      attribute: 'Data',
      types: ['Reptile'],
      fields: ['Nature'],
      description: 'english',
      skills: [{ name: 'Blast', translation: 'Tiro', description: 'desc' }],
      priorEvolutions: [{ id: 99, name: 'Prev', image: 'p.png', condition: 'c' }],
      nextEvolutions: [],
    })
  })

  it('aplica valores padrão quando faltam dados', async () => {
    get.mockResolvedValue({
      data: raw(6, { images: [], levels: [], attributes: [], descriptions: [] }),
    })

    const detail = await service.fetchDigimon(6)

    expect(detail).toMatchObject({ image: '', level: 'Unknown', attribute: 'Unknown', description: '' })
  })

  it('reaproveita a promise em cache', async () => {
    get.mockResolvedValue({ data: raw(7) })

    await service.fetchDigimon(7)
    await service.fetchDigimon(7)

    expect(get).toHaveBeenCalledTimes(1)
  })

  it('remove do cache quando a requisição falha', async () => {
    get.mockRejectedValueOnce(new Error('falhou')).mockResolvedValueOnce({ data: raw(8) })

    await expect(service.fetchDigimon(8)).rejects.toThrow('falhou')
    await vi.waitFor(async () => {
      await expect(service.fetchDigimon(8)).resolves.toMatchObject({ id: 8 })
    })
  })
})

describe('toSummary', () => {
  it('mantém apenas os campos do resumo', async () => {
    get.mockResolvedValue({ data: raw(9) })
    const detail = await service.fetchDigimon(9)

    expect(service.toSummary(detail)).toEqual({
      id: 9,
      name: 'Digimon9',
      image: 'img9.png',
      level: 'Child',
      attribute: 'Data',
    })
  })
})

describe('fetchDigimonPage', () => {
  const mockApi = (names: string[]) =>
    get.mockImplementation((url: string) =>
      url === '/digimon'
        ? Promise.resolve(indexOf(names))
        : Promise.resolve({ data: raw(Number(url.split('/')[2])) }),
    )

  it('ordena, pagina e busca os detalhes só da página', async () => {
    mockApi(['Cherub', 'Alpha', 'Bravo'])

    const page = await service.fetchDigimonPage({ page: 1, pageSize: 2 })

    expect(page.totalElements).toBe(3)
    expect(page.totalPages).toBe(2)
    expect(page.items.map((item) => item.id)).toEqual([2, 3])
    expect(get).toHaveBeenCalledTimes(3)
  })

  it('inverte a ordem quando sort é desc', async () => {
    mockApi(['Alpha', 'Bravo', 'Cherub'])

    const page = await service.fetchDigimonPage({ page: 1, pageSize: 3, sort: 'desc' })

    expect(page.items.map((item) => item.id)).toEqual([3, 2, 1])
  })

  it('filtra por trecho do nome sem diferenciar maiúsculas', async () => {
    mockApi(['Agumon', 'Gabumon', 'Patamon'])

    const page = await service.fetchDigimonPage({ page: 1, pageSize: 10, name: '  GAB ' })

    expect(page.totalElements).toBe(1)
    expect(page.items[0].id).toBe(2)
  })

  it('envia nível/atributo e cacheia o índice por filtro', async () => {
    mockApi(['Agumon'])

    await service.fetchDigimonPage({ page: 1, pageSize: 5, level: 'Child', attribute: 'Data' })
    await service.fetchDigimonPage({ page: 1, pageSize: 5, level: 'Child', attribute: 'Data' })

    const indexCalls = get.mock.calls.filter(([url]) => url === '/digimon')
    expect(indexCalls).toHaveLength(1)
    const params = indexCalls[0][1].params as URLSearchParams
    expect(params.get('level')).toBe('Child')
    expect(params.get('attribute')).toBe('Data')
    expect(params.get('pageSize')).toBe('5000')
  })

  it('trata resposta sem content como lista vazia', async () => {
    get.mockResolvedValue({ data: {} })

    const page = await service.fetchDigimonPage({ page: 1, pageSize: 5 })

    expect(page).toEqual({ items: [], totalElements: 0, totalPages: 0 })
  })

  it('descarta o índice do cache quando a requisição falha', async () => {
    get.mockRejectedValueOnce(new Error('falhou'))
    await expect(service.fetchDigimonPage({ page: 1, pageSize: 5 })).rejects.toThrow('falhou')

    mockApi(['Agumon'])
    await vi.waitFor(async () => {
      const page = await service.fetchDigimonPage({ page: 1, pageSize: 5 })
      expect(page.totalElements).toBe(1)
    })
  })
})
