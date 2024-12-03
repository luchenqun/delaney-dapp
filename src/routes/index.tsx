import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/login/index.tsx';
import { Home } from '../pages/index/home.tsx';
import { IndexLayout } from '../components/layout/index.tsx';
import { Benifit } from '../pages/benifit/index.tsx';
import { Team } from '../pages/team/index.tsx';
import { BenifitDetail } from '../pages/benifit/detail.tsx';
import { HomeHistory } from '../pages/index/history.tsx';
import { WalletConnect } from '../pages/login/wallet.tsx';
import { Message } from '../pages/index/message.tsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <WalletConnect />
  },
  {
    path: '/',
    element: <IndexLayout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/benifit',
        element: <Benifit />
      },
      {
        path: '/team',
        element: <Team />
      }
    ]
  },
  {
    path: '/benifit/detail',
    element: <BenifitDetail />
  },
  {
    path: '/home/history',
    element: <HomeHistory />
  },
  {
    path: '/message',
    element: <Message />
  }
]);
