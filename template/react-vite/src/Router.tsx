import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NotFound from '@/common/404/NotFound';
import Loading from './common/Loading/Loading';

const Home = lazy(() => import('./pages/Home/Home'));
const Rule = lazy(() => import('./pages/Rule/Rule'));

export default function Router() {
  return (
    <Suspense fallback={<Loading style={{ height: '100vh' }} />}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="home/*" element={<Home />} />
          <Route path="rule" element={<Rule />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
}
