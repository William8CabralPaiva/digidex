export const LEVELS = [
  'Baby I',
  'Baby II',
  'Child',
  'Adult',
  'Perfect',
  'Ultimate',
  'Armor',
  'Hybrid',
] as const;

export const ATTRIBUTES = ['Data', 'Vaccine', 'Virus', 'Free', 'Variable'] as const;

const LEVEL_LABELS: Record<string, string> = {
  'Baby I': 'Lv. I',
  'Baby II': 'Lv. II',
  Child: 'Lv. III',
  Adult: 'Lv. IV',
  Perfect: 'Lv. V',
  Ultimate: 'Lv. VI',
};

export const getLevelLabel = (level: string) => LEVEL_LABELS[level] ?? level;
