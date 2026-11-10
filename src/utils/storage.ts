export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage indisponível ou cheio: o app continua funcionando sem persistência
  }
}

const LAST_VIEWED_KEY = 'digidex:last-viewed';
const DEFAULT_DIGIMON_ID = 1;

export const getLastViewedId = () => readStorage<number>(LAST_VIEWED_KEY, DEFAULT_DIGIMON_ID);
export const setLastViewedId = (id: number) => writeStorage(LAST_VIEWED_KEY, id);
