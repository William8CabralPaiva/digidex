import { Link } from 'react-router';
import { Emblem, Logo, Wrapper } from './styles';

export function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <Logo>
        <h1>DIGIDEX</h1>
        <p>DIGIMON ENCYCLOPEDIA</p>
      </Logo>
      </Link>
      <Emblem aria-hidden="true" />
    </Wrapper>
  );
}
