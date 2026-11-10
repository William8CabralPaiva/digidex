import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './assets/styles/global';
import { router } from './routes';
import { FavoritesProvider } from './store/favorites/FavoritesProvider';
import { theme } from './theme/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
