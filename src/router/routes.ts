import NotFound from '../pages/NotFound';
import RewardsPage from '../pages/RewardsPage';
import DashboardPage from '../pages/DashboardPage';
import StakePage from '../pages/StakePage';

export interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any;
}

export const routes: IRoute[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        exact: true,
        component: DashboardPage,
    },
    {
        path: '/stake',
        name: 'Stake',
        exact: true,
        component: StakePage,
    },
    {
        path: '/rewards',
        name: 'Rewards',
        exact: true,
        component: RewardsPage,
    },
    {
        path: '*',
        name: 'Not Found',
        exact: false,
        component: NotFound,
    },
];
