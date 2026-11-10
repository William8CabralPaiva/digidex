import styled from 'styled-components';

export const Panel = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border}88;
  background: ${({ theme }) => theme.colors.panel};

  p {
    color: ${({ theme }) => theme.colors.muted};
  }
`;
