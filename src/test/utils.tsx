import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { FavoritesProvider } from '../store/favorites/FavoritesProvider'
import { theme } from '../theme/theme'
import type { DigimonDetail, DigimonSummary } from '../types/digimon'

export const agumon: DigimonSummary = {
  id: 1,
  name: 'Agumon',
  image: 'agumon.png',
  level: 'Child',
  attribute: 'Vaccine',
}

export const gabumon: DigimonSummary = {
  id: 2,
  name: 'Gabumon',
  image: 'gabumon.png',
  level: 'Child',
  attribute: 'Data',
}

export const agumonDetail: DigimonDetail = {
  ...agumon,
  types: ['Reptile'],
  fields: ['Nature Spirits'],
  releaseDate: '1997',
  description: 'Um dinossauro laranja.',
  skills: [{ name: 'Pepper Breath', translation: 'Baby Flame', description: 'Cospe fogo.' }],
  priorEvolutions: [{ id: 10, name: 'Koromon', image: 'k.png', condition: 'Nível' }],
  nextEvolutions: [{ id: 3, name: 'Greymon', image: 'g.png', condition: '' }],
}

function LocationProbe() {
  const { pathname, search } = useLocation()
  return <output data-testid="location">{pathname + search}</output>
}

interface Options {
  route?: string
  path?: string
}

export function renderWithProviders(ui: ReactElement, { route = '/', path = '*' }: Options = {}) {
  return render(
    <ThemeProvider theme={theme}>
      <FavoritesProvider>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
          </Routes>
          <LocationProbe />
        </MemoryRouter>
      </FavoritesProvider>
    </ThemeProvider>,
  )
}
