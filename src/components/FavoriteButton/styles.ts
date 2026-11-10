import styled from 'styled-components';

export const Button = styled.button<{ $active: boolean; $size: 'sm' | 'md' }>`
  display: grid;
  place-items: center;
  width: ${({ $size }) => ($size === 'sm' ? '2rem' : '2.8rem')};
  height: ${({ $size }) => ($size === 'sm' ? '2rem' : '2.8rem')};
  font-size: ${({ $size }) => ($size === 'sm' ? '1.1rem' : '1.5rem')};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.yellow}88;
  background: rgba(8, 13, 24, 0.75);
  color: ${({ $active, theme }) => ($active ? theme.colors.yellow : theme.colors.muted)};
  transition: color 0.15s ease, transform 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.yellow};
    transform: scale(1.08);
  }
`;
