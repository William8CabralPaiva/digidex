import styled from 'styled-components';

export const Pill = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  background: rgba(8, 13, 24, 0.6);
  border: 1px solid ${({ $color }) => $color}66;
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
`;

export const Dot = styled.span<{ $color: string }>`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 8px ${({ $color }) => $color};
`;

export const LevelPill = styled.span`
  display: inline-block;
  padding: 0.1rem 0.7rem;
  border-radius: 999px;
  border: 2px solid ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.yellow};
  background: rgba(8, 13, 24, 0.75);
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
`;
