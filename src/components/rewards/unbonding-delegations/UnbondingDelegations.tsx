import React, { useEffect, useMemo } from 'react';
import { useKepler } from '../../../store';
import useRequest from '../../../hooks/useRequest';
import useApi from '../../../hooks/useApi';
import { Spinner } from 'react-bootstrap';
import { FlexJustifyCenter } from '../../styled/Flex';
import { WrapperDashboardInfo } from '../styles/WrapperDashboard';
import UnbondingDelegationCard from './UnbondingDelegationCard';

const UnbondingDelegations = () => {
    const { account } = useKepler();
    const { API } = useApi();
    const { request, resp, isLoading } = useRequest();

    useEffect(() => {
        if (account) {
            request(API.getUnbondingDelegation, account);
        }
    }, [account]);

    const unbondingDelegations = useMemo(() => {
        if (!Object.keys(resp).length) return [];

        return resp.unbonding_responses;
    }, [resp]);

    return (
        <>
            {isLoading ? (
                <FlexJustifyCenter>
                    <Spinner animation="border" />
                </FlexJustifyCenter>
            ) : unbondingDelegations.length ? (
                <WrapperDashboardInfo>
                    {unbondingDelegations.map((elem: any, i: number) => (
                        <UnbondingDelegationCard key={i} data={elem} />
                    ))}
                </WrapperDashboardInfo>
            ) : (
                <FlexJustifyCenter>Not unbonding delegations</FlexJustifyCenter>
            )}
        </>
    );
};

export default UnbondingDelegations;
