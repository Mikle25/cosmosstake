import React, { useEffect, useMemo } from 'react';
import StatsEachInfo from './StatsEachInfo';
import { ConvertToUSD, TextWrap } from './StatsStyles';
import { useTheme } from 'styled-components';
import ArrowIcon from '../styled/icons/ArrowIcon';
import { FlexWithGap } from '../styled/Flex';
import { useKepler } from '../../store';
import useApi from '../../hooks/useApi';
import useRequest from '../../hooks/useRequest';
import { formatMinimalDenomToCoinDenom } from '../../utils/helpers';
import { useWallet } from '../../store/wallet';

const StakedInfo = () => {
    const theme = useTheme();
    const { account } = useKepler();
    const { balance } = useWallet();
    const { API } = useApi();
    const { resp, request, isLoading } = useRequest();

    useEffect(() => {
        if (account) {
            request(API.getDelegations, account);
        }
    }, [account, balance]);

    const myDelegate = useMemo((): any[] => {
        if (!Object.keys(resp).length) return [];

        return resp.delegation_responses;
    }, [resp]);

    const totalStake = useMemo(() => {
        const total = myDelegate.reduce((acc, elem) => {
            acc += +elem.balance.amount;

            return acc;
        }, 0);

        return `${formatMinimalDenomToCoinDenom(total)}`;
    }, [myDelegate]);

    return (
        <StatsEachInfo
            title={'staked tokens'}
            amount={totalStake}
            isLoading={isLoading}
        >
            <FlexWithGap gap="10px">
                <ConvertToUSD color={theme.lightGreen}>$100</ConvertToUSD>

                <TextWrap color={theme.gray}>
                    <ArrowIcon /> Unstake
                </TextWrap>
            </FlexWithGap>
        </StatsEachInfo>
    );
};

export default StakedInfo;
