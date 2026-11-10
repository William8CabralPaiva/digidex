import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme/theme'
import { agumon, agumonDetail, renderWithProviders } from '../test/utils'
import { AttributeBadge, LevelBadge, TypeBadge } from './Badges'
import { BackButton } from './BackButton'
import { DigimonCard } from './DigimonCard'
import { EvolutionTree } from './EvolutionTree'
import { FavoriteButton } from './FavoriteButton'
import { Header } from './Header'
import { Pagination } from './Pagination'
import { SearchFilters } from './SearchFilters'
import { Sidebar } from './Sidebar'
import { EmptyState, ErrorState, Loading } from './State'
import * as Icons from './Icons'

describe('Badges', () => {
  it('mostra rótulos de nível, atributo e tipo', () => {
    renderWithProviders(
      <>
        <LevelBadge level="Child" />
        <AttributeBadge attribute="Data" />
        <AttributeBadge attribute="Inexistente" />
        <TypeBadge label="Reptile" />
      </>,
    )

    expect(screen.getByText('Lv. III')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Inexistente')).toBeInTheDocument()
    expect(screen.getByText('Reptile')).toBeInTheDocument()
  })
})

describe('State', () => {
  it('renderiza loading, vazio e erro', () => {
    render(
      <ThemeProvider theme={theme}>
        <Loading />
        <Loading label="Aguarde" />
        <EmptyState message="Nada aqui" />
        <ErrorState message="Deu ruim" />
      </ThemeProvider>,
    )

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
    expect(screen.getByText('Aguarde')).toBeInTheDocument()
    expect(screen.getByText('Nada aqui')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Deu ruim')
  })
})

describe('Icons', () => {
  it('renderiza todos os ícones', () => {
    const { container } = render(
      <>
        {Object.values(Icons).map((Icon, index) => (
          <Icon key={index} filled={index % 2 === 0} />
        ))}
      </>,
    )

    expect(container.querySelectorAll('svg')).toHaveLength(Object.keys(Icons).length)
  })
})

describe('FavoriteButton', () => {
  it('alterna o estado de favorito', async () => {
    renderWithProviders(<FavoriteButton digimon={agumon} />)

    await userEvent.click(screen.getByRole('button', { name: 'Favoritar Agumon' }))
    const active = screen.getByRole('button', { name: 'Remover Agumon dos favoritos' })
    expect(active).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(active)
    expect(screen.getByRole('button', { name: 'Favoritar Agumon' })).toBeInTheDocument()
  })
})

describe('DigimonCard', () => {
  it('mostra dados e link para o detalhe', () => {
    renderWithProviders(<DigimonCard digimon={agumon} />)

    expect(screen.getByText('Agumon')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver detalhes de Agumon' })).toHaveAttribute(
      'href',
      '/digimon/1',
    )
    expect(screen.getByAltText('Agumon')).toHaveAttribute('src', 'agumon.png')
  })
})

describe('EvolutionTree', () => {
  const getHref = (id: number) => `/evolution/${id}`

  it('mostra mensagem quando não há evoluções', () => {
    renderWithProviders(<EvolutionTree current={agumon} prior={[]} next={[]} getHref={getHref} />)

    expect(screen.getByText(/não possui linha de evolução/)).toBeInTheDocument()
  })

  it('mostra anteriores, atual e próximas', () => {
    renderWithProviders(
      <EvolutionTree
        current={agumon}
        prior={agumonDetail.priorEvolutions}
        next={agumonDetail.nextEvolutions}
        getHref={getHref}
      />,
    )

    expect(screen.getByRole('link', { name: /Koromon/ })).toHaveAttribute('href', '/evolution/10')
    expect(screen.getByRole('link', { name: /Koromon/ })).toHaveAttribute('title', 'Nível')
    expect(screen.getByRole('link', { name: /Greymon/ })).toHaveAttribute('title', 'Greymon')
    expect(screen.getByRole('link', { name: /Agumon/ })).toHaveAttribute('href', '/evolution/1')
  })

  it('omite o lado sem evoluções', () => {
    renderWithProviders(
      <EvolutionTree current={agumon} prior={[]} next={agumonDetail.nextEvolutions} getHref={getHref} />,
    )

    expect(screen.queryByText('Koromon')).not.toBeInTheDocument()
    expect(screen.getByText(/Greymon/)).toBeInTheDocument()
  })
})

describe('Header', () => {
  it('tem link para a página inicial', () => {
    renderWithProviders(<Header />)

    expect(screen.getByText('DIGIDEX').closest('a')).toHaveAttribute('href', '/')
  })
})

describe('Pagination', () => {
  it('não renderiza com apenas uma página', () => {
    const { container } = renderWithProviders(
      <Pagination page={1} totalPages={1} onChange={() => {}} />,
    )

    expect(container.querySelector('nav')).toBeNull()
  })

  it('mostra janela de páginas com reticências', () => {
    renderWithProviders(<Pagination page={5} totalPages={10} onChange={() => {}} />)

    const labels = screen.getAllByRole('button').map((b) => b.textContent)
    expect(labels).toEqual(['', '1', '4', '5', '6', '10', ''])
    expect(screen.getAllByText('…')).toHaveLength(2)
    expect(screen.getByText('5')).toHaveAttribute('aria-current', 'page')
  })

  it('navega com anterior, próxima e número', async () => {
    const onChange = vi.fn()
    renderWithProviders(<Pagination page={2} totalPages={3} onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Página anterior' }))
    await userEvent.click(screen.getByRole('button', { name: 'Próxima página' }))
    await userEvent.click(screen.getByText('3'))

    expect(onChange.mock.calls.map(([p]) => p)).toEqual([1, 3, 3])
  })

  it('desabilita os limites', () => {
    const { rerender } = renderWithProviders(
      <Pagination page={1} totalPages={3} onChange={() => {}} />,
    )
    expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled()

    rerender(
      <ThemeProvider theme={theme}>
        <Pagination page={3} totalPages={3} onChange={() => {}} />
      </ThemeProvider>,
    )
    expect(screen.getByRole('button', { name: 'Próxima página' })).toBeDisabled()
  })
})

describe('SearchFilters', () => {
  it('dispara os callbacks de cada controle', () => {
    const handlers = {
      onSearchChange: vi.fn(),
      onLevelChange: vi.fn(),
      onAttributeChange: vi.fn(),
      onSortChange: vi.fn(),
    }
    renderWithProviders(
      <SearchFilters search="" level="" attribute="" sort="asc" {...handlers} />,
    )

    fireEvent.change(screen.getByLabelText('Buscar Digimon'), { target: { value: 'agu' } })
    fireEvent.change(screen.getByLabelText('Filtrar por nível'), { target: { value: 'Child' } })
    fireEvent.change(screen.getByLabelText('Filtrar por atributo'), { target: { value: 'Data' } })
    fireEvent.change(screen.getByLabelText('Ordenar'), { target: { value: 'desc' } })

    expect(handlers.onSearchChange).toHaveBeenCalledWith('agu')
    expect(handlers.onLevelChange).toHaveBeenCalledWith('Child')
    expect(handlers.onAttributeChange).toHaveBeenCalledWith('Data')
    expect(handlers.onSortChange).toHaveBeenCalledWith('desc')
  })
})

describe('Sidebar', () => {
  it('marca o item ativo e aponta Evolução para o último visto', () => {
    localStorage.setItem('digidex:last-viewed', '7')
    renderWithProviders(<Sidebar />, { route: '/favorites' })

    expect(screen.getByRole('link', { name: 'Favoritos' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Explorar' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Evolução' })).toHaveAttribute('href', '/evolution/7')
  })

  it('considera ativa qualquer rota de evolução', () => {
    renderWithProviders(<Sidebar />, { route: '/evolution/3' })

    expect(screen.getByRole('link', { name: 'Evolução' })).toHaveAttribute('aria-current', 'page')
  })
})

describe('BackButton', () => {
  const renderAt = (entries: Parameters<typeof MemoryRouter>[0]['initialEntries'], index?: number) =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={entries} initialIndex={index}>
          <BackButton />
        </MemoryRouter>
      </ThemeProvider>,
    )

  it('volta no histórico quando existe', async () => {
    const { container } = renderAt(['/a', { pathname: '/b', key: 'abc' }], 1)
    await userEvent.click(screen.getByRole('button', { name: /Voltar/ }))
    expect(container).toBeTruthy()
  })

  it('vai para a home quando não há histórico', async () => {
    renderAt(['/a'])
    await userEvent.click(screen.getByRole('button', { name: /Voltar/ }))
  })
})
