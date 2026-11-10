import styled from 'styled-components';
import { Link } from 'react-router';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-around;
    padding: 0.25rem;
  }
`;

export const Item = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.8rem 0.4rem;
  border-radius: 0 12px 12px 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ $active, theme }) => ($active ? theme.colors.background : theme.colors.muted)};
  background: ${({ $active, theme }) => ($active ? theme.colors.yellow : 'transparent')};
  transition: background 0.15s ease, color 0.15s ease;

  svg {
    font-size: 1.7rem;
  }

  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.colors.background : theme.colors.text)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1;
    border-radius: 10px;
  }
`;
