import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 2.2rem;
  height: 2.2rem;
  padding: 0 0.5rem;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 700;
  background: ${({ $active, theme }) => ($active ? theme.colors.yellow : theme.colors.panel)};
  color: ${({ $active, theme }) => ($active ? theme.colors.background : theme.colors.text)};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Gap = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;
