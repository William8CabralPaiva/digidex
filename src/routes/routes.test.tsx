import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { FavoritesProvider } from '../store/favorites/FavoritesProvider'
import { theme } from '../theme/theme'
import { router } from './index'

vi.mock('../services/digimonApi', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../services/digimonApi')>()),
  fetchDigimonPage: () => new Promise(() => {}),
  fetchDigimon: () => new Promise(() => {}),
}))

const renderAt = (path: string) => {
  const memory = createMemoryRouter(router.routes, { initialEntries: [path] })
  return render(
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <RouterProvider router={memory} />
      </FavoritesProvider>
    </ThemeProvider>,
  )
}

describe('routes', () => {
  it.each(['/', '/favorites', '/settings', '/evolution/1'])('%s exibe a sidebar', (path) => {
    renderAt(path)
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument()
  })

  it('/digimon/:id não exibe a sidebar', () => {
    renderAt('/digimon/1')
    expect(screen.queryByRole('navigation', { name: 'Navegação principal' })).toBeNull()
    expect(screen.getByText('Carregando Digimon...')).toBeInTheDocument()
  })

  it('rota desconhecida mostra NotFound sem sidebar', () => {
    renderAt('/xyz')
    expect(screen.getByText('Página não encontrada.')).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Navegação principal' })).toBeNull()
  })
})
