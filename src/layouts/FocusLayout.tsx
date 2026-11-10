import { Outlet } from 'react-router';
import { AppFrame } from './AppFrame';
import { FocusContent } from './styles';

// Telas de foco (ex.: detalhe) sem barra lateral
export function FocusLayout() {
  return (
    <AppFrame>
      <FocusContent>
        <Outlet />
      </FocusContent>
    </AppFrame>
  );
}
