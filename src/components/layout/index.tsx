import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './footer';
import { useEffect } from 'react';

export const IndexLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <>
      <div className="pb-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
