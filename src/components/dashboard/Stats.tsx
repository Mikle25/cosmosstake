import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import StatsEachInfo from './StatsEachInfo';
import { Text } from '../styled/Text';
import { useWallet } from '../../store/wallet';
import StakeCard from './StakeCard';
import RewardsCard from './RewardsCard';
import { CURRENT_YIELD } from '../../utils/constants';
import StakedInfo from './StakedInfo';
import { ConvertToUSD } from './StatsStyles';
import UnbondingInfo from './UnbondingInfo';

const StatsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 350px) 1fr;
    gap: 25px;
    min-height: 300px;

    margin-bottom: ${({ theme }) => theme.marginContainer};
`;

const FlexVerticalCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
`;

const Stats: FC = () => {
    const theme = useTheme();
    const { balance } = useWallet();
    const [currBalance, setCurrBalance] = useState(balance);

    useEffect(() => {
        setCurrBalance(balance);
    }, [balance]);

    const handleChangeBalance = (e: ChangeEvent<HTMLInputElement>) => {
        if (isFinite(+e.target.value)) {
            setCurrBalance(e.target.value);
        }
    };

    const monthlyReturns = useMemo(() => {
        return `${(+currBalance * CURRENT_YIELD) / 12}`;
    }, [currBalance]);

    const annualEarning = useMemo(() => {
        return `${+currBalance * CURRENT_YIELD}`;
    }, [currBalance]);

    return (
        <>
            <StatsWrapper>
                <RewardsCard />

                <StakeCard
                    currBalance={currBalance}
                    availableBalance={balance}
                    handleChangeBalance={handleChangeBalance}
                />

                <FlexVerticalCenter>
                    <StatsEachInfo
                        title={'monthly earning'}
                        amount={monthlyReturns}
                    >
                        <ConvertToUSD bgColor={theme.lightGreen}>
                            $100
                        </ConvertToUSD>
                    </StatsEachInfo>
                    <StatsEachInfo
                        title={'annual earning'}
                        amount={annualEarning}
                    >
                        <ConvertToUSD bgColor={theme.lightGreen}>
                            $100
                        </ConvertToUSD>
                    </StatsEachInfo>
                </FlexVerticalCenter>

                <UnbondingInfo />

                <StakedInfo />

                <StatsEachInfo title={'current yield'}>
                    <Text color={theme.lightGreen} fs={'36px'}>
                        {CURRENT_YIELD * 100}%
                    </Text>
                </StatsEachInfo>
            </StatsWrapper>
        </>
    );
};

export default Stats;
