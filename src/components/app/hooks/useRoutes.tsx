import { useState } from 'react';

const useRoutes = () => {
    const [routes] = useState<any[]>([
        {
            name: 'Dashboard',
            path: '/dashboard',
        },
        {
            name: 'Stake',
            path: '/stake',
        },
        {
            name: 'Rewards',
            path: '/rewards',
        },
    ]);

    return routes;
};

export default useRoutes;
