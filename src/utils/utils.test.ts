import { getLevelLabel } from './digimon'
import { getLastViewedId, readStorage, setLastViewedId, writeStorage } from './storage'

describe('getLevelLabel', () => {
  it('traduz níveis conhecidos', () => {
    expect(getLevelLabel('Child')).toBe('Lv. III')
    expect(getLevelLabel('Ultimate')).toBe('Lv. VI')
  })

  it('devolve o próprio nível quando desconhecido', () => {
    expect(getLevelLabel('Armor')).toBe('Armor')
  })
})

describe('storage', () => {
  it('lê e grava valores JSON', () => {
    writeStorage('k', { a: 1 })
    expect(readStorage('k', null)).toEqual({ a: 1 })
  })

  it('usa o fallback quando não há valor ou o JSON é inválido', () => {
    expect(readStorage('nada', 'x')).toBe('x')
    localStorage.setItem('ruim', '{')
    expect(readStorage('ruim', 'x')).toBe('x')
  })

  it('não quebra quando o storage lança erro', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('cheio')
    })
    expect(() => writeStorage('k', 1)).not.toThrow()
    spy.mockRestore()
  })

  it('guarda o último Digimon visto, com 1 como padrão', () => {
    expect(getLastViewedId()).toBe(1)
    setLastViewedId(42)
    expect(getLastViewedId()).toBe(42)
  })
})
