import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Frame, Shell } from './styles';

export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <Shell>
      <Frame>
        <Header />
        {children}
      </Frame>
    </Shell>
  );
}
