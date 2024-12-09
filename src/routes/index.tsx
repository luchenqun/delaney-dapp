import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Bind } from '../pages/login/bind.tsx';
import { Home } from '../pages/index/home.tsx';
import { IndexLayout } from '../components/layout/index.tsx';
import { Benifit } from '../pages/benifit/index.tsx';
import { Team } from '../pages/team/index.tsx';
import { BenifitDetail } from '../pages/benifit/detail.tsx';
import { HomeHistory } from '../pages/index/history.tsx';
import { WalletConnect } from '../pages/login/wallet.tsx';
import { Message } from '../pages/index/message.tsx';
import { VerifyLayout } from '../components/layout/verify.tsx';
import { Claim } from '../pages/index/claim.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <VerifyLayout />,
    children: [
      {
        path: '/bind',
        element: <Bind />
      },
      {
        path: '/connect',
        element: <WalletConnect />
      },
      {
        path: '/',
        // element: <VerifyLayout />,
        children: [
          {
            path: '/',
            element: <IndexLayout />,
            children: [
              {
                path: '/',
                element: <Home />
              },
              {
                path: '/benifit',
                element: <Benifit />
              },
              {
                path: '/teams',
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
          },
          {
            path: '/claim',
            element: <Claim />
          }
        ]
      }
    ]
  }
]);
