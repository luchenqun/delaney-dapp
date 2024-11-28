import { Badge } from "antd-mobile";
import logo from "../../assets/logo.svg";
import bell from "../../assets/bell.svg";

export const HomeHeaders = () => {
  return <div className="bg-white px-4 py-1 flex justify-between items-center">
    <div className="flex">
      <img className="w-10 h-10" src={logo} alt="logo" />
      <div className="ml-3">
        <div className="text-base">Delaney</div>
        <div className="text-primary text-sm">MUD ≈ 0.25 USDT</div>
      </div>
    </div>
    <Badge content={Badge.dot}>
      <img className="w-6 h-6" src={bell} alt="消息" />
    </Badge>
  </div>;
}