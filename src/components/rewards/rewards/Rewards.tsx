import React, { useEffect, useMemo } from 'react';
import { useKepler } from '../../../store';
import useApi from '../../../hooks/useApi';
import useRequest from '../../../hooks/useRequest';
import useStargateSDK from '../../../hooks/useStargateSDK';
import MyRewardCard from './MyRewardCard';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { Flex, FlexJustifyCenter } from '../../styled/Flex';
import { formatMinimalDenomToCoinDenom } from '../../../utils/helpers';
import { WrapperDashboardInfo } from '../styles/WrapperDashboard';

const WrapperContent = styled(Flex)`
    flex-direction: column;
    gap: 20px;
`;

const Rewards = () => {
    const { account, chain, setBalance } = useKepler();
    const { API } = useApi();
    const { Claim } = useStargateSDK();
    const rewardsRequest = useRequest();

    useEffect(() => {
        if (account) {
            rewardsRequest.request(API.getReward, account);
        }
    }, [account]);

    const handleClaim = async (validator: string) => {
        await Claim({ delegate: account, validator });
        await rewardsRequest.request(API.getReward, account);
        await setBalance(account, API.getBalance);
    };

    const rewards = useMemo(() => {
        if (!Object.keys(rewardsRequest.resp)) return {};

        return rewardsRequest.resp;
    }, [rewardsRequest.resp]);

    return (
        <>
            {rewardsRequest.isLoading ? (
                <FlexJustifyCenter>
                    <Spinner animation="border" />
                </FlexJustifyCenter>
            ) : rewards.rewards && rewards.total.length ? (
                <WrapperContent>
                    <h5>
                        Total rewards:
                        {formatMinimalDenomToCoinDenom(
                            rewards.total[0].amount,
                            chain.coinDenom,
                        )}
                    </h5>

                    <WrapperDashboardInfo>
                        {rewards.rewards.map(
                            (elem: any, i: number) =>
                                !!elem.reward.length && (
                                    <MyRewardCard
                                        key={i}
                                        data={elem}
                                        handleClaim={handleClaim}
                                    />
                                ),
                        )}
                    </WrapperDashboardInfo>
                </WrapperContent>
            ) : (
                <FlexJustifyCenter>Not rewards</FlexJustifyCenter>
            )}
        </>
    );
};

export default Rewards;
