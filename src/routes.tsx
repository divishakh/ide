import IDEPage from './pages/IDEPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'IDE',
    path: '/',
    element: <IDEPage />
  }
];

export default routes;
