import { favoritesReducer } from './favoritesReducer'
import { agumon, gabumon } from '../../test/utils'

describe('favoritesReducer', () => {
  it('ADD adiciona um item novo', () => {
    expect(favoritesReducer([agumon], { type: 'ADD', payload: gabumon })).toEqual([agumon, gabumon])
  })

  it('ADD ignora duplicados mantendo a mesma referência', () => {
    const state = [agumon]
    expect(favoritesReducer(state, { type: 'ADD', payload: agumon })).toBe(state)
  })

  it('REMOVE remove pelo id', () => {
    expect(favoritesReducer([agumon, gabumon], { type: 'REMOVE', payload: { id: 1 } })).toEqual([
      gabumon,
    ])
  })

  it('CLEAR esvazia a lista', () => {
    expect(favoritesReducer([agumon, gabumon], { type: 'CLEAR' })).toEqual([])
  })
})
