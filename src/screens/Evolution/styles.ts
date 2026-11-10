import styled from 'styled-components';

export const Profile = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 1rem 0;

  img {
    width: 9rem;
    aspect-ratio: 1;
    object-fit: contain;
    border-radius: 16px;
    border: 2px solid ${({ theme }) => theme.colors.cyan};
    background: ${({ theme }) => theme.colors.panel};
  }

  h2 {
    font-size: 2rem;
  }
`;

export const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

export const Panel = styled.section`
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border}88;
  background: ${({ theme }) => theme.colors.panel};

  h3 {
    margin-bottom: 0.75rem;
    padding-left: 0.6rem;
    border-left: 4px solid ${({ theme }) => theme.colors.yellow};
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
  }
`;
