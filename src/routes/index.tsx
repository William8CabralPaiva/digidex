import { createBrowserRouter } from 'react-router';
import { FocusLayout } from '../layouts/FocusLayout';
import { SidebarLayout } from '../layouts/SidebarLayout';
import { DigimonDetail } from '../screens/DigimonDetail/DigimonDetail';
import { Evolution } from '../screens/Evolution/Evolution';
import { Explorer } from '../screens/Explorer/Explorer';
import { Favorites } from '../screens/Favorites/Favorites';
import { NotFound } from '../screens/NotFound/NotFound';
import { Settings } from '../screens/Settings/Settings';

export const router = createBrowserRouter([
  {
    // Telas com barra lateral
    element: <SidebarLayout />,
    children: [
      { index: true, element: <Explorer /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'evolution/:id?', element: <Evolution /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    // Telas de foco, sem barra lateral
    element: <FocusLayout />,
    children: [
      { path: 'digimon/:id', element: <DigimonDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
