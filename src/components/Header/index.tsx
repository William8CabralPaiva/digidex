import { Emblem, Logo, Wrapper } from './styles';

export function Header() {
  return (
    <Wrapper>
      <Logo>
        <h1>DIGIDEX</h1>
        <p>DIGIMON ENCYCLOPEDIA</p>
      </Logo>
      <Emblem aria-hidden="true" />
    </Wrapper>
  );
}
