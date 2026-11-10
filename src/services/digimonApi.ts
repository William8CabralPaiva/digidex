import type {
  DigimonDetail,
  DigimonPage,
  DigimonQuery,
  DigimonSummary,
  EvolutionLink,
} from '../types/digimon';
import { api } from './api';

interface RawEvolution {
  id: number;
  digimon: string;
  condition: string;
  image: string;
}

interface RawDigimon {
  id: number;
  name: string;
  images: { href: string }[];
  levels: { level: string }[];
  types: { type: string }[];
  attributes: { attribute: string }[];
  fields: { field: string }[];
  releaseDate: string;
  descriptions: { language: string; description: string }[];
  skills: { skill: string; translation: string; description: string }[];
  priorEvolutions: RawEvolution[];
  nextEvolutions: RawEvolution[];
}

interface RawPage {
  content?: { id: number; name: string }[];
}

type IndexItem = { id: number; name: string };

const detailCache = new Map<number, Promise<DigimonDetail>>();
const indexCache = new Map<string, Promise<IndexItem[]>>();

// Índice leve (id + nome) de todos os Digimons, opcionalmente filtrado por nível/atributo
function fetchIndex(level?: string, attribute?: string): Promise<IndexItem[]> {
  const key = `${level ?? ''}|${attribute ?? ''}`;
  const cached = indexCache.get(key);
  if (cached) return cached;

  const params = new URLSearchParams({ pageSize: '5000' });
  if (level) params.set('level', level);
  if (attribute) params.set('attribute', attribute);

  const promise = api
    .get<RawPage>('/digimon', { params })
    .then(({ data }) => (data.content ?? []).map(({ id, name }) => ({ id, name })));
  indexCache.set(key, promise);
  promise.catch(() => indexCache.delete(key));

  return promise;
}

const toEvolution = (raw: RawEvolution): EvolutionLink => ({
  id: raw.id,
  name: raw.digimon,
  image: raw.image,
  condition: raw.condition,
});

function toDetail(raw: RawDigimon): DigimonDetail {
  const english = raw.descriptions.find((item) => item.language === 'en_us');

  return {
    id: raw.id,
    name: raw.name,
    image: raw.images[0]?.href ?? '',
    level: raw.levels[0]?.level ?? 'Unknown',
    attribute: raw.attributes[0]?.attribute ?? 'Unknown',
    types: raw.types.map((item) => item.type),
    fields: raw.fields.map((item) => item.field),
    releaseDate: raw.releaseDate,
    description: english?.description ?? '',
    skills: raw.skills.map((item) => ({
      name: item.skill,
      translation: item.translation,
      description: item.description,
    })),
    priorEvolutions: raw.priorEvolutions.map(toEvolution),
    nextEvolutions: raw.nextEvolutions.map(toEvolution),
  };
}

export function toSummary(detail: DigimonDetail): DigimonSummary {
  const { id, name, image, level, attribute } = detail;
  return { id, name, image, level, attribute };
}

export function fetchDigimon(id: number): Promise<DigimonDetail> {
  const cached = detailCache.get(id);
  if (cached) return cached;

  // Sem AbortSignal: a promise é compartilhada via cache entre chamadas
  const promise = api.get<RawDigimon>(`/digimon/${id}`).then(({ data }) => toDetail(data));
  detailCache.set(id, promise);
  promise.catch(() => detailCache.delete(id));

  return promise;
}

export async function fetchDigimonPage({
  page,
  pageSize,
  name,
  level,
  attribute,
  sort = 'asc',
}: DigimonQuery): Promise<DigimonPage> {
  const index = await fetchIndex(level, attribute);
  const term = name?.trim().toLowerCase();

  // A API só filtra por prefixo; a busca por trecho do nome é feita aqui
  const matches = term
    ? index.filter((item) => item.name.toLowerCase().includes(term))
    : [...index];

  matches.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'desc') matches.reverse();

  const start = (page - 1) * pageSize;
  const pageItems = matches.slice(start, start + pageSize);
  const details = await Promise.all(pageItems.map((item) => fetchDigimon(item.id)));

  return {
    items: details.map(toSummary),
    totalElements: matches.length,
    totalPages: Math.ceil(matches.length / pageSize),
  };
}

