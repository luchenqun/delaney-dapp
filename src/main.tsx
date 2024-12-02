import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { calculateFontSize } from './utils/rem';
import '@smastrom/react-rating/style.css';
import './index.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './utils/wagmi';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    calculateFontSize();

    window.addEventListener('resize', calculateFontSize);
  }, []);

  return (
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
