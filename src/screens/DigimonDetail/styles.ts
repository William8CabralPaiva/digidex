import styled from 'styled-components';

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Hero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.div`
  padding: 1rem 1.25rem;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border}88;
  background: ${({ theme }) => theme.colors.panel};
`;

export const Portrait = styled(Panel)`
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 50% 70%, #1559b8, #0a1a36 75%);

  img {
    width: min(100%, 22rem);
    aspect-ratio: 1;
    object-fit: contain;
  }
`;

export const Summary = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  h2 {
    font-size: 2.2rem;
    line-height: 1;
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 1.05rem;
  }
`;

export const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.25rem 0 0.75rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0.55rem 1.25rem;
  border-radius: 12px 12px 0 0;
  border: 1px solid ${({ theme }) => theme.colors.border}88;
  font-weight: 700;
  background: ${({ $active, theme }) => ($active ? theme.colors.yellow : theme.colors.panel)};
  color: ${({ $active, theme }) => ($active ? theme.colors.background : theme.colors.muted)};
`;

export const SectionTitle = styled.h3`
  margin-bottom: 0.6rem;
  padding-left: 0.6rem;
  border-left: 4px solid ${({ theme }) => theme.colors.yellow};
  font-size: 1.15rem;
`;

export const InfoTable = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem 1.5rem;
  margin-bottom: 1rem;

  dt {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export const Skills = styled.ul`
  display: grid;
  gap: 0.75rem;
  list-style: none;

  li {
    padding: 0.6rem 0.8rem;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.panelAlt};
  }

  strong {
    color: ${({ theme }) => theme.colors.cyan};
  }

  small {
    margin-left: 0.4rem;
    color: ${({ theme }) => theme.colors.muted};
  }

  p {
    color: ${({ theme }) => theme.colors.muted};
  }
`;
