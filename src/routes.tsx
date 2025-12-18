import LandingPage from './pages/LandingPage';
import IDEPage from './pages/IDEPage';
import { SharePage } from './pages/SharePage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />
  },
  {
    name: 'IDE',
    path: '/ide',
    element: <IDEPage />
  },
  {
    name: 'Share',
    path: '/share/:shareId',
    element: <SharePage />,
    visible: false
  }
];

export default routes;
