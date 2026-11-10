import styled from 'styled-components';

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const DigimonGrid = styled.div<{ $dimmed?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.5 : 1)};
  transition: opacity 0.15s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

export const ActionButton = styled.button<{ $variant?: 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid
    ${({ $variant, theme }) => ($variant === 'danger' ? theme.colors.danger : theme.colors.cyan)}99;
  background: ${({ theme }) => theme.colors.panel};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.panelAlt};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
