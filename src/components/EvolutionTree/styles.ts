import styled from 'styled-components';
import { Link } from 'react-router';

export const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: safe center;
  gap: 0.6rem;
  max-height: 22rem;
  overflow-y: auto;
  padding: 0.25rem;
`;

export const Arrow = styled.span`
  align-self: center;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.yellow};
`;

export const Node = styled(Link)<{ $current?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6.5rem;
  padding: 0.4rem;
  border-radius: 12px;
  border: 2px solid
    ${({ $current, theme }) => ($current ? theme.colors.yellow : theme.colors.border)};
  background: ${({ theme }) => theme.colors.panel};
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`;

export const Empty = styled.span`
  align-self: center;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;
