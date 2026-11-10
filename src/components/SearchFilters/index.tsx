import { ATTRIBUTES, LEVELS } from '../../utils/digimon';
import { SearchIcon } from '../Icons';
import { Bar, Filters, SearchBox, Select } from './styles';

export type SortOrder = 'asc' | 'desc';

interface SearchFiltersProps {
  search: string;
  level: string;
  attribute: string;
  sort: SortOrder;
  onSearchChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onAttributeChange: (value: string) => void;
  onSortChange: (value: SortOrder) => void;
}

export function SearchFilters({
  search,
  level,
  attribute,
  sort,
  onSearchChange,
  onLevelChange,
  onAttributeChange,
  onSortChange,
}: SearchFiltersProps) {
  return (
    <Bar>
      <SearchBox>
        <SearchIcon />
        <input
          type="search"
          value={search}
          placeholder="Buscar Digimon..."
          aria-label="Buscar Digimon"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </SearchBox>

      <Filters>
        <Select
          value={level}
          aria-label="Filtrar por nível"
          onChange={(event) => onLevelChange(event.target.value)}
        >
          <option value="">Todos os níveis</option>
          {LEVELS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          value={attribute}
          aria-label="Filtrar por atributo"
          onChange={(event) => onAttributeChange(event.target.value)}
        >
          <option value="">Todos os atributos</option>
          {ATTRIBUTES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select
          value={sort}
          aria-label="Ordenar"
          onChange={(event) => onSortChange(event.target.value as SortOrder)}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </Select>
      </Filters>
    </Bar>
  );
}
