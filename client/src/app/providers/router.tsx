import { createBrowserRouter } from 'react-router-dom';
import { Main } from '@/components/Main/Main.tsx';
import { Chat } from '@/components/Chat/Chat.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
]);
