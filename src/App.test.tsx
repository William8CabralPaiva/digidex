import { render, screen } from '@testing-library/react'
import { App } from './App'

const fetchDigimonPage = vi.fn()
vi.mock('./services/digimonApi', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./services/digimonApi')>()),
  fetchDigimonPage: (...args: unknown[]) => fetchDigimonPage(...args),
}))

describe('App', () => {
  it('renderiza o shell com sidebar e a tela Explorar', async () => {
    fetchDigimonPage.mockResolvedValue({ items: [], totalElements: 0, totalPages: 0 })
    render(<App />)

    expect(screen.getByText('DIGIDEX')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeInTheDocument()
    expect(await screen.findByText(/Nenhum Digimon encontrado/)).toBeInTheDocument()
  })
})
