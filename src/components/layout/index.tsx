import { Outlet } from 'react-router-dom';
import { Footer } from './footer';

export const IndexLayout = () => {
  return (
    <>
      <div className="pb-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
