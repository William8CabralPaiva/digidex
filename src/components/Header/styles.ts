import styled from 'styled-components';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem 0.5rem;
`;

export const Logo = styled.div`
  h1 {
    font-family: ${({ theme }) => theme.fonts.title};
    font-style: italic;
    font-weight: 900;
    font-size: clamp(1.8rem, 5vw, 2.8rem);
    line-height: 1;
    letter-spacing: 0.04em;
    text-shadow: 0 0 14px ${({ theme }) => theme.colors.cyan}88;
  }

  p {
    margin-top: 0.2rem;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: clamp(0.6rem, 2vw, 0.85rem);
    font-weight: 700;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.colors.cyan};
  }
`;

export const Emblem = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.cyan};
  box-shadow: 0 0 14px ${({ theme }) => theme.colors.cyan}88;
  display: grid;
  place-items: center;

  &::after {
    content: '';
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.cyan};
  }
`;
