import { useCallback, useEffect, useState } from 'react';
import { IValidators } from '../interface/Validators';
import { RewardsResp } from '../components/dashboard/types';
import { IDelegatedProps } from '../interface/Delegate';
import useApi from './useApi';
import { useKepler } from '../store';

const useStakedValidators = () => {
    const { API } = useApi();
    const { account } = useKepler();
    const [isStaked, setStaked] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getStakedValidators = useCallback(async () => {
        try {
            setLoading(true);
            const delegatedValidators = await API.getDelegatorValidators(
                account,
            );
            const rewards = await API.getReward(account);
            const staked = await API.getDelegations(account);

            const all = delegatedValidators.data.validators.map(
                (elem: IValidators) => {
                    const rewardItem = rewards.data.rewards.find(
                        (item: RewardsResp) =>
                            item.validator_address === elem.operator_address,
                    );

                    const stakedItem = staked.data.delegation_responses.find(
                        (item: IDelegatedProps) =>
                            item.delegation.validator_address ===
                            elem.operator_address,
                    );
                    return {
                        ...elem,
                        rewards: rewardItem,
                        staked: stakedItem,
                    };
                },
            );

            setStaked(all);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [account]);

    useEffect(() => {
        if (account) {
            getStakedValidators();
        }
    }, [account]);

    return {
        isLoading,
        isStaked,
        getStakedValidators,
    };
};

export default useStakedValidators;
