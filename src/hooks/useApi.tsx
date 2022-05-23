import { useMemo } from 'react';
import axios from 'axios';
import { useKepler } from '../store';

const useApi = () => {
    const { chain } = useKepler();

    const api = useMemo(() => {
        return axios.create({
            baseURL: chain.rest,
            timeout: 30000,
        });
    }, [chain]);

    const API = {
        getValidators() {
            // return api.get('/staking/validators');
            return api.get('/cosmos/staking/v1beta1/validators');
        },
        getValidator(validator: string) {
            return api.get(`/cosmos/staking/v1beta1/validators/${validator}`);
        },
        getDelegations(address?: string) {
            return api.get(`/cosmos/staking/v1beta1/delegations/${address}`);
            // return api.get(`/staking/delegators/${address}/delegations`);
        },
        getReward(delegator: string) {
            return api.get(
                `/cosmos/distribution/v1beta1/delegators/${delegator}/rewards`,
            );
            // return api.get(`/distribution/delegators/${delegator}/rewards`);
        },
        getBalance(address: string) {
            return api.get(`/cosmos/bank/v1beta1/balances/${address}`);
            // return api.get(`/bank/balances/${address}`);
        },
        getUnbondingDelegation(address: string) {
            return api.get(
                `/cosmos/staking/v1beta1/delegators/${address}/unbonding_delegations`,
                // `/staking/delegators/${address}/unbonding_delegations`,
            );
        },
    };

    return {
        API,
    };
};

export default useApi;
