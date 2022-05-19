import NotFound from '../pages/NotFound';
import RewardsPage from '../pages/RewardsPage';
import DashboardPage from '../pages/DashboardPage';
import StakePage from '../pages/StakePage';
import SettingPage from '../pages/additionalPages/SettingPage';
import AboutUsPage from '../pages/additionalPages/AboutUsPage';
import FAQ from '../pages/additionalPages/FAQ';
import CosmoscanPage from '../pages/additionalPages/CosmoscanPage';
import SupportPage from '../pages/additionalPages/SupportPage';

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
        path: '/setting',
        name: 'Setting',
        exact: true,
        component: SettingPage,
    },
    {
        path: '/about',
        name: 'AboutUs',
        exact: true,
        component: AboutUsPage,
    },
    {
        path: '/faq',
        name: 'FAQ',
        exact: true,
        component: FAQ,
    },
    {
        path: '/cosmoscan',
        name: 'Cosmoscan',
        exact: true,
        component: CosmoscanPage,
    },
    {
        path: '/support',
        name: 'Support',
        exact: true,
        component: SupportPage,
    },
    {
        path: '*',
        name: 'Not Found',
        exact: false,
        component: NotFound,
    },
];
