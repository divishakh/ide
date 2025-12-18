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
    name: 'IDE',
    path: '/',
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
