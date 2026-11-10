import styled from 'styled-components';
import { Link } from 'react-router';

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border}88;
  background: ${({ theme }) => theme.colors.panel};
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.yellow};
    box-shadow: 0 0 18px ${({ theme }) => theme.colors.yellow}44;
  }
`;

export const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 50% 60%, #123a7a, #0a1a36 70%);

  img {
    max-width: 85%;
    max-height: 85%;
    object-fit: contain;
  }
`;

export const LevelSlot = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const FavoriteSlot = styled.div`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  z-index: 1;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.5rem 0.8rem;

  strong {
    font-size: 1.1rem;
    text-align: center;
  }
`;
