import React from 'react';
import { WrapperTable } from '../styled/Tbl';
import Table from '../table/Table';
import { formatMinimalDenomToCoinDenom } from '../../utils/helpers';
import { useKepler } from '../../store';
import { useThemeToggle } from '../../hooks/useThemeContext';
import { useTheme } from 'styled-components';
import { FlexJustifyCenter } from '../styled/Flex';
import Loader from '../Loader';
import useStakedValidators from '../../hooks/useStakedValidators';

const StakedValidatorsTable = () => {
    const { chain } = useKepler();
    const { themeName } = useThemeToggle();
    const theme = useTheme();
    const { getStakedValidators, isStaked, isLoading } = useStakedValidators();

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
            key: 'staked',
            label: 'Staked',
            process(data: any): JSX.Element {
                return (
                    <div>
                        {formatMinimalDenomToCoinDenom(
                            data.staked.balance.amount,
                            chain.coinDenom,
                        )}
                    </div>
                );
            },
        },
        {
            key: 'rewards',
            label: 'Rewards',
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
                        {formatMinimalDenomToCoinDenom(
                            data.rewards.reward[0].amount,
                        )}
                    </div>
                );
            },
        },
        {
            key: 'manage',
            label: '',
            process(data: any): JSX.Element {
                return <div>Manage</div>;
            },
        },
    ];

    return (
        <WrapperTable>
            {isLoading ? (
                <FlexJustifyCenter>
                    <Loader />
                </FlexJustifyCenter>
            ) : isStaked.length ? (
                <Table cols={cols} rows={isStaked} />
            ) : (
                <FlexJustifyCenter>Not staked</FlexJustifyCenter>
            )}
        </WrapperTable>
    );
};

export default StakedValidatorsTable;
