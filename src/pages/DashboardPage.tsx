import React from 'react';
import Divider from '../components/styled/Divider';
import Stats from '../components/dashboard/Stats';
import TableValidators from '../components/dashboard/TableValidators';

const DashboardPage = () => {
    return (
        <>
            <Stats />

            <Divider />

            <TableValidators />
        </>
    );
};

export default DashboardPage;
