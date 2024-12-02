import { NavBar } from 'antd-mobile';
import { CardDelegate } from '../../components/home/card-delegate';

export const HomeHistory = () => {
  const handleBack = () => {
    history.back();
  };

  return (
    <>
      <NavBar onBack={handleBack}>收益列表详情</NavBar>
      <div className="bg-[#F5F5F5] min-h-screen pt-1">
        <CardDelegate />
      </div>
    </>
  );
};
