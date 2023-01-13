import { lazy as _lazy, LazyExoticComponent } from 'react';
import { NotFound } from '@/components/common/feedback';
const lazy: any = (load: any) => {
  const component = () =>
    load().catch((error: any) => {
      if (error?.code === 'MODULE_NOT_FOUND') {
        return {
          default: NotFound,
        };
      }
      return error;
    });
  return _lazy(component);
};
export type AppRoute = {
  path: string;
  component: LazyExoticComponent<(props: any) => JSX.Element>;
  name?: string;
  meta?: {
    isWhite: Boolean /* 是否白名单 */
  }
  // routes?: AppRoute[]
};
export const routes: AppRoute[] = [
  { path: '/login', component: lazy(() => import('@/pages/login')), meta: { isWhite: true } },
  /* 放在layout的路由 */
  { path: '/', component: lazy(() => import('@/pages/home')) },
  { path: '/pressRelease/attractInvestment', component: lazy(() => import('@/pages/attractInvestment')) },
  { path: '/pressRelease/policyDocument', component: lazy(() => import('@/pages/policyDocument')) },
  { path: '/pressRelease/policyDocument/add', component: lazy(() => import('@/pages/policyDocument/add')) },
]