import { ChevronLeftIcon, ChevronRightIcon } from '../Icons';
import { Gap, Nav, PageButton } from './styles';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// Janela de páginas: primeira, última e vizinhas da atual, com reticências
function getVisiblePages(page: number, totalPages: number): (number | 'gap')[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  return sorted.flatMap((p, index) =>
    index > 0 && p - sorted[index - 1] > 1 ? (['gap', p] as const) : [p],
  );
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Nav aria-label="Paginação">
      <PageButton
        type="button"
        aria-label="Página anterior"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeftIcon />
      </PageButton>

      {getVisiblePages(page, totalPages).map((item, index) =>
        item === 'gap' ? (
          <Gap key={`gap-${index}`}>…</Gap>
        ) : (
          <PageButton
            key={item}
            type="button"
            $active={item === page}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onChange(item)}
          >
            {item}
          </PageButton>
        ),
      )}

      <PageButton
        type="button"
        aria-label="Próxima página"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRightIcon />
      </PageButton>
    </Nav>
  );
}
