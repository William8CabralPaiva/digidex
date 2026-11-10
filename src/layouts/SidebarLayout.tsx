import { Outlet } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { AppFrame } from './AppFrame';
import { SidebarBody, SidebarContent } from './styles';

// Rotas que exibem a barra lateral são filhas deste layout
export function SidebarLayout() {
  return (
    <AppFrame>
      <SidebarBody>
        <Sidebar />
        <SidebarContent>
          <Outlet />
        </SidebarContent>
      </SidebarBody>
    </AppFrame>
  );
}
