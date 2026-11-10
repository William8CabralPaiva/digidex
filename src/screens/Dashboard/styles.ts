import styled from 'styled-components';

export const Layout = styled.main`
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  color: #00f0ff;
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 6vw, 3.5rem);
`;

export const Description = styled.p`
  color: #c5d0e6;
  font-size: 1.25rem;
`;
