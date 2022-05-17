import React, { useEffect, useMemo } from 'react';
import useApi from '../../../hooks/useApi';
import useRequest from '../../../hooks/useRequest';
import MyDelegatedCard from './MyDelegatedCard';
import { Spinner } from 'react-bootstrap';
import { useKepler } from '../../../store';
import { FlexJustifyCenter } from '../../styled/Flex';
import useStargateSDK, {
    IOption,
    IRedelegate,
} from '../../../hooks/useStargateSDK';
import { convertIntToMutez } from '../../../utils/helpers';
import { WrapperDashboardInfo } from '../styles/WrapperDashboard';

const Delegations = () => {
    const { account } = useKepler();
    const { API } = useApi();
    const { resp, request, isLoading } = useRequest();
    const { Undelegate, Redelegate } = useStargateSDK();

    useEffect(() => {
        if (account) {
            request(API.getDelegations, account);
        }
    }, [account]);

    const handleUndelegate = async ({ from, to, amount, denom }: IOption) => {
        await Undelegate({
            from,
            to,
            amount: convertIntToMutez(amount),
            denom,
        });
        await request(API.getDelegations, account);
    };

    const handleRedelegate = async ({
        delegator,
        validatorFrom,
        validatorTo,
        amount,
        denom,
    }: IRedelegate) => {
        await Redelegate({
            delegator,
            validatorFrom,
            validatorTo,
            amount: convertIntToMutez(amount),
            denom,
        });
        await request(API.getDelegations, account);
    };

    const myDelegate = useMemo(() => {
        if (!Object.keys(resp).length) return [];

        return resp.delegation_responses;
    }, [resp]);

    return (
        <div>
            {isLoading ? (
                <FlexJustifyCenter>
                    <Spinner animation="border" variant="primary" />
                </FlexJustifyCenter>
            ) : myDelegate.length ? (
                <WrapperDashboardInfo>
                    {myDelegate.map((delegate: any, i: number) => (
                        <MyDelegatedCard
                            key={i}
                            delegate={delegate}
                            handleUndelegate={handleUndelegate}
                            handleRedelegate={handleRedelegate}
                        />
                    ))}
                </WrapperDashboardInfo>
            ) : (
                <FlexJustifyCenter>Not delegations</FlexJustifyCenter>
            )}
        </div>
    );
};

export default Delegations;
