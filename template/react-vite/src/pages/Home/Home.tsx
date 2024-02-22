import './Home.scoped.css';
import { useGlobalContext } from '@/context/globalContext';

// 倒计时,榜单,抽奖等活动常用的模板代码
export default function Home() {
  const { userInfo } = useGlobalContext();
  return <div className="page test1">home</div>;
}
