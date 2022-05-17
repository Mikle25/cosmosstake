import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Table from '../components/table/Table';
import useRequest from '../hooks/useRequest';
import { formatToken, formatPercent } from '../utils/helpers';
import Stake from '../components/stake/Stake';
import useApi from '../hooks/useApi';
import { useKepler } from '../store';
import { FlexJustifyCenter } from '../components/styled/Flex';
import Divider from '../components/styled/Divider';
import Stats from '../components/dashboard/Stats';
import Loader from '../components/Loader';
import { IValidators } from '../interface/Validators';

const WrapperTable = styled.div`
    margin: ${({ theme }) => theme.marginContainer};
`;

const DashboardPage = () => {
    const { chain } = useKepler();
    const { API } = useApi();
    const { resp, isLoading, request } = useRequest();

    useEffect(() => {
        if (chain) {
            request(API.getValidators);
        }
    }, [chain]);

    const validators = useMemo((): Array<IValidators> => {
        if (!Object.keys(resp)) return [];

        return resp.validators;
    }, [resp]);

    const cols = [
        {
            key: 'rank',
            label: 'Rank',
        },
        {
            key: 'name',
            label: 'Name',
            process(data: any): JSX.Element {
                return <div>{data.description.moniker}</div>;
            },
        },
        {
            key: 'tokens',
            label: 'Voting power',
            process(data: any): JSX.Element {
                return (
                    <div>
                        {formatToken(data.delegator_shares, chain.coinDenom)}
                    </div>
                );
            },
        },
        {
            key: 'commission',
            label: 'Commission',
            process(data: any): JSX.Element {
                return (
                    <div>
                        {formatPercent(data.commission.commission_rates.rate)}
                    </div>
                );
            },
        },
        {
            key: 'button',
            label: '',
            process(data: any): JSX.Element {
                return (
                    <div style={{ width: '80px' }}>
                        <Stake data={data} />
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Stats />

            <Divider />

            <WrapperTable>
                {isLoading ? (
                    <FlexJustifyCenter>
                        <Loader />
                    </FlexJustifyCenter>
                ) : validators ? (
                    <Table cols={cols} rows={validators} />
                ) : (
                    <FlexJustifyCenter>Not validators</FlexJustifyCenter>
                )}
            </WrapperTable>
        </>
    );
};

export default DashboardPage;
