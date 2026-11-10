import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { agumon, agumonDetail, gabumon, renderWithProviders } from '../test/utils'
import { DigimonDetail } from './DigimonDetail/DigimonDetail'
import { Evolution } from './Evolution/Evolution'
import { Explorer } from './Explorer/Explorer'
import { Favorites } from './Favorites/Favorites'
import { NotFound } from './NotFound/NotFound'
import { Settings } from './Settings/Settings'

const fetchDigimon = vi.fn()
const fetchDigimonPage = vi.fn()
vi.mock('../services/digimonApi', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../services/digimonApi')>()),
  fetchDigimon: (...args: unknown[]) => fetchDigimon(...args),
  fetchDigimonPage: (...args: unknown[]) => fetchDigimonPage(...args),
}))

beforeEach(() => {
  fetchDigimon.mockReset()
  fetchDigimonPage.mockReset()
})

const seedFavorites = (count: number) =>
  localStorage.setItem(
    'digidex:favorites',
    JSON.stringify(Array.from({ length: count }, (_, i) => ({ ...agumon, id: i + 1, name: `D${i + 1}` }))),
  )

describe('NotFound', () => {
  it('mostra mensagem e link de volta', () => {
    renderWithProviders(<NotFound />)

    expect(screen.getByText('Página não encontrada.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar ao Explorar' })).toHaveAttribute('href', '/')
  })
})

describe('Settings', () => {
  it('mostra a contagem e limpa os favoritos', async () => {
    seedFavorites(2)
    renderWithProviders(<Settings />)

    expect(screen.getByText('2 Digimon(s) no armazenamento local.')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Limpar favoritos/ }))

    expect(screen.getByText('0 Digimon(s) no armazenamento local.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Limpar favoritos/ })).toBeDisabled()
  })
})

describe('Favorites', () => {
  it('mostra estado vazio com o botão desabilitado', () => {
    renderWithProviders(<Favorites />)

    expect(screen.getByText(/ainda não favoritou/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Limpar tudo/ })).toBeDisabled()
  })

  it('pagina e limpa tudo', async () => {
    seedFavorites(7)
    renderWithProviders(<Favorites />)

    expect(screen.getByText('D1')).toBeInTheDocument()
    expect(screen.queryByText('D7')).not.toBeInTheDocument()

    await userEvent.click(screen.getByText('2'))
    expect(screen.getByText('D7')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Limpar tudo/ }))
    expect(screen.getByText(/ainda não favoritou/)).toBeInTheDocument()
  })

  it('volta para a última página válida ao remover o último item', async () => {
    seedFavorites(7)
    renderWithProviders(<Favorites />)
    await userEvent.click(screen.getByText('2'))

    await userEvent.click(screen.getByRole('button', { name: 'Remover D7 dos favoritos' }))

    expect(screen.getByText('D6')).toBeInTheDocument()
  })
})

describe('DigimonDetail', () => {
  const route = { route: '/digimon/1', path: '/digimon/:id' }

  it('mostra loading e depois os dados com as abas', async () => {
    fetchDigimon.mockResolvedValue(agumonDetail)
    renderWithProviders(<DigimonDetail />, route)

    expect(screen.getByText('Carregando Digimon...')).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Agumon' })).toBeInTheDocument()
    expect(screen.getByText('Um dinossauro laranja.')).toBeInTheDocument()
    expect(screen.getByText('Reptile', { selector: 'dd' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Habilidades' }))
    expect(screen.getByText('Pepper Breath')).toBeInTheDocument()
    expect(screen.getByText('(Baby Flame)')).toBeInTheDocument()
    expect(screen.getByText('Cospe fogo.')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: 'Evolução' }))
    expect(screen.getByRole('link', { name: /Greymon/ })).toBeInTheDocument()
    expect(screen.queryByText('Informações')).not.toBeInTheDocument()
  })

  it('mostra fallbacks para dados vazios', async () => {
    fetchDigimon.mockResolvedValue({
      ...agumonDetail,
      description: '',
      types: [],
      fields: [],
      releaseDate: '',
      skills: [],
      priorEvolutions: [],
      nextEvolutions: [],
    })
    renderWithProviders(<DigimonDetail />, route)

    expect(await screen.findByText('Lv. III sem descrição.')).toBeInTheDocument()
    expect(screen.getAllByText('—')).toHaveLength(3)

    await userEvent.click(screen.getByRole('tab', { name: 'Habilidades' }))
    expect(screen.getByText('Nenhuma habilidade registrada.')).toBeInTheDocument()
  })

  it('omite tradução e descrição ausentes nas habilidades', async () => {
    fetchDigimon.mockResolvedValue({
      ...agumonDetail,
      skills: [{ name: 'Solo', translation: '', description: '' }],
    })
    renderWithProviders(<DigimonDetail />, route)

    await userEvent.click(await screen.findByRole('tab', { name: 'Habilidades' }))
    expect(screen.getByText('Solo')).toBeInTheDocument()
    expect(screen.queryByText(/\(/)).not.toBeInTheDocument()
  })

  it('mostra erro', async () => {
    fetchDigimon.mockRejectedValue(new Error('Falha ao consultar a API (404)'))
    renderWithProviders(<DigimonDetail />, route)

    expect(await screen.findByRole('alert')).toHaveTextContent('Falha ao consultar a API (404)')
  })
})

describe('Evolution', () => {
  it('usa o id da rota e lista as próximas formas', async () => {
    fetchDigimon.mockResolvedValue({
      ...agumonDetail,
      nextEvolutions: ['A', 'B', 'C', 'D', 'E', 'F'].map((name, i) => ({
        id: 100 + i,
        name,
        image: '',
        condition: '',
      })),
    })
    renderWithProviders(<Evolution />, { route: '/evolution/1', path: '/evolution/:id?' })

    expect(screen.getByText('Carregando evolução...')).toBeInTheDocument()
    expect(await screen.findByText(/pode evoluir para A, B, C, D e mais 2 formas/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver detalhes →' })).toHaveAttribute('href', '/digimon/1')
    expect(fetchDigimon).toHaveBeenCalledWith(1)
  })

  it('usa o último visto sem id e trata ausência de evoluções', async () => {
    localStorage.setItem('digidex:last-viewed', '1')
    fetchDigimon.mockResolvedValue({ ...agumonDetail, nextEvolutions: [], priorEvolutions: [] })
    renderWithProviders(<Evolution />, { route: '/evolution', path: '/evolution/:id?' })

    expect(await screen.findByText('Agumon não possui evoluções posteriores registradas.')).toBeInTheDocument()
  })

  it('mostra erro', async () => {
    fetchDigimon.mockRejectedValue(new Error('quebrou'))
    renderWithProviders(<Evolution />, { route: '/evolution/1', path: '/evolution/:id?' })

    expect(await screen.findByRole('alert')).toHaveTextContent('quebrou')
  })

  it('não cita "mais formas" quando todas cabem na lista', async () => {
    fetchDigimon.mockResolvedValue(agumonDetail)
    renderWithProviders(<Evolution />, { route: '/evolution/1', path: '/evolution/:id?' })

    const text = await screen.findByText(/pode evoluir para Greymon\./)
    expect(text).not.toHaveTextContent('mais')
  })
})

describe('Explorer', () => {
  const page = (items = [agumon, gabumon], totalPages = 3, totalElements = 25) => ({
    items,
    totalPages,
    totalElements,
  })

  it('lista Digimons e mostra o intervalo exibido', async () => {
    fetchDigimonPage.mockResolvedValue(page())
    renderWithProviders(<Explorer />)

    expect(screen.getByText('Carregando Digimons...')).toBeInTheDocument()
    expect(await screen.findByText('Agumon')).toBeInTheDocument()
    expect(screen.getByText('Gabumon')).toBeInTheDocument()
    expect(screen.getByText('Mostrando 1–2 de 25 Digimons')).toBeInTheDocument()
    expect(fetchDigimonPage).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, pageSize: 9, sort: 'asc' }),
    )
  })

  it('lê filtros da URL', async () => {
    fetchDigimonPage.mockResolvedValue(page())
    renderWithProviders(<Explorer />, {
      route: '/?q=agu&level=Child&attribute=Data&sort=desc&page=2',
    })

    await screen.findByText('Agumon')
    expect(fetchDigimonPage).toHaveBeenCalledWith({
      page: 2,
      pageSize: 9,
      name: 'agu',
      level: 'Child',
      attribute: 'Data',
      sort: 'desc',
    })
  })

  it('atualiza a URL ao mudar filtros, ordenação e página', async () => {
    fetchDigimonPage.mockResolvedValue(page())
    renderWithProviders(<Explorer />)
    await screen.findByText('Agumon')

    fireEvent.change(screen.getByLabelText('Filtrar por nível'), { target: { value: 'Adult' } })
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('level=Adult'))

    fireEvent.change(screen.getByLabelText('Filtrar por atributo'), { target: { value: 'Virus' } })
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('attribute=Virus'))

    fireEvent.change(screen.getByLabelText('Ordenar'), { target: { value: 'desc' } })
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('sort=desc'))

    await userEvent.click(screen.getByRole('button', { name: 'Próxima página' }))
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('page=2'))

    await userEvent.click(screen.getByRole('button', { name: 'Página anterior' }))
    await waitFor(() => expect(screen.getByTestId('location')).not.toHaveTextContent('page='))

    fireEvent.change(screen.getByLabelText('Ordenar'), { target: { value: 'asc' } })
    await waitFor(() => expect(screen.getByTestId('location')).not.toHaveTextContent('sort='))
  })

  it('aplica a busca na URL após o debounce', async () => {
    fetchDigimonPage.mockResolvedValue(page())
    renderWithProviders(<Explorer />, { route: '/?page=3' })
    await screen.findByText('Agumon')

    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    fireEvent.change(screen.getByLabelText('Buscar Digimon'), { target: { value: ' gab ' } })
    await act(async () => {
      vi.advanceTimersByTime(400)
    })
    vi.useRealTimers()

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('q=gab'))
    expect(screen.getByTestId('location')).not.toHaveTextContent('page=')
  })

  it('mostra estado vazio', async () => {
    fetchDigimonPage.mockResolvedValue(page([], 0, 0))
    renderWithProviders(<Explorer />)

    expect(await screen.findByText(/Nenhum Digimon encontrado/)).toBeInTheDocument()
  })

  it('mostra erro quando não há dados', async () => {
    fetchDigimonPage.mockRejectedValue(new Error('sem rede'))
    renderWithProviders(<Explorer />)

    expect(await screen.findByRole('alert')).toHaveTextContent('sem rede')
  })

  it('normaliza page inválida para 1', async () => {
    fetchDigimonPage.mockResolvedValue(page())
    renderWithProviders(<Explorer />, { route: '/?page=abc' })

    await screen.findByText('Agumon')
    expect(fetchDigimonPage).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }))
  })
})
