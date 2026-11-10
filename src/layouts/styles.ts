import styled from 'styled-components';

export const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1rem;
`;

export const Frame = styled.div`
  width: min(1100px, 100%);
  min-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(circle at 15% 0%, #0f3a80 0%, transparent 45%),
    linear-gradient(160deg, #0b2250, ${({ theme }) => theme.colors.background});
  box-shadow: 0 0 30px ${({ theme }) => theme.colors.border}66, inset 0 0 24px #00000066;
`;

export const SidebarBody = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const SidebarContent = styled.main`
  padding: 0.5rem 1.5rem 1.5rem;
  min-width: 0;
`;

export const FocusContent = styled.main`
  flex: 1;
  padding: 0.5rem 1.5rem 1.5rem;
`;
