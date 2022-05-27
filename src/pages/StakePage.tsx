import React from 'react';
import Divider from '../components/styled/Divider';
import StakedValidatorsTable from '../components/stake/StakedValidatorsTable';

const StakePage = () => {
    return (
        <>
            <div> Stake</div>

            <Divider />

            <StakedValidatorsTable />
        </>
    );
};

export default StakePage;
