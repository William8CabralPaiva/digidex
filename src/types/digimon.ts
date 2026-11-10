export interface DigimonSummary {
  id: number;
  name: string;
  image: string;
  level: string;
  attribute: string;
}

export interface EvolutionLink {
  id: number;
  name: string;
  image: string;
  condition: string;
}

export interface DigimonSkill {
  name: string;
  translation: string;
  description: string;
}

export interface DigimonDetail extends DigimonSummary {
  types: string[];
  fields: string[];
  releaseDate: string;
  description: string;
  skills: DigimonSkill[];
  priorEvolutions: EvolutionLink[];
  nextEvolutions: EvolutionLink[];
}

export interface DigimonPage {
  items: DigimonSummary[];
  totalElements: number;
  totalPages: number;
}

export interface DigimonQuery {
  page: number;
  pageSize: number;
  name?: string;
  level?: string;
  attribute?: string;
  sort?: 'asc' | 'desc';
}
