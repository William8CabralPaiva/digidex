import styled from 'styled-components';

export const Bar = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const SearchBox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.panel};
  font-size: 1.4rem;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.cyan};
  }

  input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.1rem;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const Select = styled.select`
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.panel};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;
