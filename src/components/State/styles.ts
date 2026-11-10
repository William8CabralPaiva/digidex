import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.border}55;
  border-top-color: ${({ theme }) => theme.colors.cyan};
  animation: ${spin} 0.8s linear infinite;
`;

export const Center = styled.div`
  display: grid;
  place-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

export const ErrorCenter = styled(Center)`
  color: ${({ theme }) => theme.colors.danger};
`;
