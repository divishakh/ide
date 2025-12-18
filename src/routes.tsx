import LandingPage from './pages/LandingPage';
import IDEPage from './pages/IDEPage';
import LoginPage from './pages/LoginPage';
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
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false
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
