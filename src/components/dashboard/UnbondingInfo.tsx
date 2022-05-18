import React, { useEffect, useMemo, useState } from 'react';
import { ConvertToUSD, TextWrap } from './StatsStyles';
import StatsEachInfo from './StatsEachInfo';
import { useTheme } from 'styled-components';
import { FlexWithGap } from '../styled/Flex';
import TimeIcon from '../styled/icons/TimeIcon';
import { useKepler } from '../../store';
import useApi from '../../hooks/useApi';
import useRequest from '../../hooks/useRequest';
import {
    formatMinimalDenomToCoinDenom,
    getNumberOfDays,
} from '../../utils/helpers';

const UnbondingInfo = () => {
    const theme = useTheme();
    const { account } = useKepler();
    const { API } = useApi();
    const { request, resp, isLoading } = useRequest();
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        if (account) {
            request(API.getUnbondingDelegation, account);
        }
    }, [account]);

    const unbondingDelegations = useMemo((): any[] => {
        if (!Object.keys(resp).length) return [];

        return resp.unbonding_responses;
    }, [resp]);

    const totalUnbonding = useMemo(() => {
        let date = 0;
        const total = unbondingDelegations.reduce((acc, elem) => {
            acc += +elem.entries.reduce((a: number, item: any) => {
                if (date <= new Date(item.completion_time).getTime()) {
                    date = new Date(item.completion_time).getTime();
                }

                a += +item.balance;
                return a;
            }, 0);

            return acc;
        }, 0);

        setDaysLeft(getNumberOfDays(date));

        return `${formatMinimalDenomToCoinDenom(total)}`;
    }, [unbondingDelegations]);

    return (
        <StatsEachInfo
            title={'unbonding tokens'}
            amount={totalUnbonding}
            isLoading={isLoading}
        >
            <FlexWithGap gap="10px">
                <ConvertToUSD color={theme.lightGreen}>$100</ConvertToUSD>
                <TextWrap color={theme.gray}>
                    <TimeIcon /> MAX {daysLeft} DAYS LEFT
                </TextWrap>
            </FlexWithGap>
        </StatsEachInfo>
    );
};

export default UnbondingInfo;
