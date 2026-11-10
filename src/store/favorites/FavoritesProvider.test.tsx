import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { agumon, gabumon } from '../../test/utils'
import { FavoritesProvider } from './FavoritesProvider'
import { useFavorites } from './useFavorites'

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
)

describe('FavoritesProvider / useFavorites', () => {
  it('lança erro fora do provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useFavorites())).toThrow('FavoritesProvider')
    spy.mockRestore()
  })

  it('alterna favorito e persiste no localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => result.current.toggleFavorite(agumon))
    expect(result.current.isFavorite(1)).toBe(true)
    expect(JSON.parse(localStorage.getItem('digidex:favorites')!)).toEqual([agumon])

    act(() => result.current.toggleFavorite(agumon))
    expect(result.current.isFavorite(1)).toBe(false)
    expect(result.current.favorites).toEqual([])
  })

  it('limpa todos os favoritos', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => {
      result.current.toggleFavorite(agumon)
    })
    act(() => {
      result.current.toggleFavorite(gabumon)
    })
    act(() => result.current.clearFavorites())

    expect(result.current.favorites).toEqual([])
  })

  it('carrega favoritos salvos', () => {
    localStorage.setItem('digidex:favorites', JSON.stringify([gabumon]))
    const { result } = renderHook(() => useFavorites(), { wrapper })

    expect(result.current.favorites).toEqual([gabumon])
  })

  it('ignora valor salvo que não seja lista', () => {
    localStorage.setItem('digidex:favorites', JSON.stringify({ a: 1 }))
    const { result } = renderHook(() => useFavorites(), { wrapper })

    expect(result.current.favorites).toEqual([])
  })
})
