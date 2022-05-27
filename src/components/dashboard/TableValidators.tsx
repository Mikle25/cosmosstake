import React, { useEffect, useMemo } from 'react';
import { FlexJustifyCenter } from '../styled/Flex';
import Loader from '../Loader';
import Table from '../table/Table';
import { useTheme } from 'styled-components';
import { useKepler } from '../../store';
import useApi from '../../hooks/useApi';
import useRequest from '../../hooks/useRequest';
import { IValidators } from '../../interface/Validators';
import {
    formatMinimalDenomToCoinDenom,
    formatPercent,
} from '../../utils/helpers';
import Stake from '../stake/Stake';
import { WrapperTable } from '../styled/Tbl';
import { useThemeToggle } from '../../hooks/useThemeContext';

const TableValidators = () => {
    const { chain } = useKepler();
    const { API } = useApi();
    const { resp, isLoading, request } = useRequest();
    const { themeName } = useThemeToggle();
    const theme = useTheme();

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
        // {
        //     key: 'rank',
        //     label: 'Rank',
        // },
        {
            key: 'validators',
            label: 'Validators',
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
                        {formatMinimalDenomToCoinDenom(
                            data.delegator_shares,
                            chain.coinDenom,
                        )}
                    </div>
                );
            },
        },
        {
            key: 'commission',
            label: 'Commission',
            process(data: any): JSX.Element {
                return (
                    <div
                        style={{
                            color:
                                themeName === 'dark'
                                    ? theme.lightGreen
                                    : theme.black,
                        }}
                    >
                        {formatPercent(data.commission.commission_rates.rate)}
                    </div>
                );
            },
        },
        {
            key: 'delegate',
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
    );
};

export default TableValidators;
