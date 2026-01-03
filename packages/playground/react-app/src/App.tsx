import { Redirect, Route, Switch, useLocation, useRoute } from 'wouter';
import AppLayout from './layouts/app-layout';
import EmptyLayout from './layouts/empty-layout';
import { lazy, Suspense } from 'react';
import Loading from './components/loading';

// 使用 lazy 懒加载所有页面组件
const LoginPage = lazy(() => import('./pages/login'));
const DashboardPage = lazy(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  })
  return import('./pages/dashboard');
});
const ShortcutsPage = lazy(() => import('./pages/shortcuts'));
const NotFoundPage = lazy(() => import('./pages/not-found'));

const AppRoute = () => {
  const [loginMatched] = useRoute('/login');
  const [dashboardMatched] = useRoute('/');
  const [shortcutsMatched] = useRoute('/shortcuts');
  const [pathname] = useLocation();
  let component: React.ReactNode = null;
  
  if (loginMatched) {
    component = (
      <EmptyLayout>
        <LoginPage />
      </EmptyLayout>
    );
  } else if (dashboardMatched || shortcutsMatched || pathname === '/dashboard') {
    component = (
      <AppLayout title={pathname.split('/').pop()?.toUpperCase() || 'DASHBOARD'}>
        <Switch>
          <Route path="/">
            <DashboardPage />
          </Route>
          <Route path="/dashboard" component={() => <Redirect to="/" />} />
          <Route path="/shortcuts">
            <ShortcutsPage />
          </Route>
        </Switch>
      </AppLayout>
    );
  } else {
    component = (
      <EmptyLayout>
        <NotFoundPage />
      </EmptyLayout>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      {component}
    </Suspense>
  )
}

export default AppRoute;